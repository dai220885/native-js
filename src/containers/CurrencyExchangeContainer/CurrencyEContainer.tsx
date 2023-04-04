import React from 'react';
import CurrencyExchange from '../../components/CurrencyExchange/CurrencyExchange';
import { CurrencyState, CurrencyType } from '../../redux/currencyReducer';
import { Dispatch } from 'redux';
import {
    ChangeActionAC,
    ChangeCurrencyFieldAC,
    ChangeCurrentCurrencyAC,
    CurrencyReducerActionsTypes
} from '../../redux/actions';
import { connect, ConnectedProps } from 'react-redux';
import {RootStateType} from '../../redux/state';

const CurrencyEContainer: React.FC<TProps> = props => {

    const {
        currencies,
        currentCurrency,
        isBuying,
        amountOfBYN,
        amountOfCurrency,
        setCurrencyAmount,
        setAction,
        changeCurrency,
    } = props;

    let currencyRate: number = 0;
    const currenciesName = currencies.map((currency: CurrencyType) => {
        if (currency.currencyName === currentCurrency) {
            currencyRate = isBuying ? currency.buyRate : currency.sellRate;
        }
        return currency.currencyName;
    });

    const changeCurrencyField = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.currentTarget.value;
        if (!isFinite(+value)) return;
        if (e.currentTarget.dataset.currency) {
            const trigger: string = e.currentTarget.dataset.currency;
            if (trigger === 'byn') {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount(value, (+Number(value).toFixed(2) / currencyRate).toFixed(2));
                }
            } else {
                if (value === '') {
                    setCurrencyAmount(value, value);
                } else {
                    setCurrencyAmount((+Number(value).toFixed(2) * currencyRate).toFixed(2), value);
                }
            }
        }
    };
    const changeAction = (e: React.MouseEvent<HTMLSpanElement>) => {
        e.currentTarget.dataset.action === 'buy' ? setAction(true) : setAction(false);
    };

    const changeCurrentCurrency = (e: React.MouseEvent<HTMLLIElement>) => {
        e.currentTarget.dataset.currency && changeCurrency(e.currentTarget.dataset.currency);
    };

    return (
        <React.Fragment>
            <CurrencyExchange
                currenciesName={currenciesName}
                currentCurrency={currentCurrency}
                currencyRate={currencyRate}
                isBuying={isBuying}
                amountOfBYN={amountOfBYN}
                amountOfCurrency={amountOfCurrency}
                changeCurrencyField={changeCurrencyField}
                changeAction={changeAction}
                changeCurrentCurrency={changeCurrentCurrency}
            />
        </React.Fragment>
    );
};

//так было:
// const mapStateToProps = ( { currency } : {currency: CurrencyState} ): CurrencyState => {

//изменил тип приходящего стейта:
const mapStateToProps = ( state : RootStateType): CurrencyState => {


    return {
        //currencies: currency.currencies,
        currencies: state.currency.currencies,
        //currentCurrency: currency.currentCurrency,
        currentCurrency: state.currency.currentCurrency,
        //isBuying: currency.isBuying,
        isBuying: state.currency.isBuying,
        //amountOfBYN: currency.amountOfBYN,
        amountOfBYN: state.currency.amountOfBYN,
        //amountOfCurrency: currency.amountOfCurrency,
        amountOfCurrency: state.currency.amountOfCurrency,
    };
};

const mapDispatchToProps = (dispatch: Dispatch<CurrencyReducerActionsTypes>) : any => {
    return {
        setCurrencyAmount: (amountOfBYN: string, amountOfCurrency: string) =>
            dispatch(ChangeCurrencyFieldAC(amountOfBYN, amountOfCurrency)),
        setAction(isBuying: boolean) {
            dispatch(ChangeActionAC(isBuying));
        },
        changeCurrency(currency: string) {
            dispatch(ChangeCurrentCurrencyAC(currency));
        },
    };
};

const connector = connect(mapStateToProps, mapDispatchToProps);

type TProps = ConnectedProps<typeof connector>;

export default connector(CurrencyEContainer);

//export const ContainerRoot = connector(CurrencyEContainer);

