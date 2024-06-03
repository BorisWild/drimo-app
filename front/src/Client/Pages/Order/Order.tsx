import React, {useEffect, useRef, useState} from 'react'
import DeliveryCard from '../../../UIkit/DeliveryCard/DeliveryCard'
import { LeftSmallRedArrow } from '../../../UIkit/Icons'
import Textarea from '../../../UIkit/Inputs/Textarea'
import Input from '../../../UIkit/Inputs/Input'
import { Link, useNavigate, useSearchParams } from 'react-router-dom'
import OrderEntity from '../../Components/OrderEntity/OrderEntity'
import { drimoAPI } from '../../../services/DrimoService'
import { IDelivery } from '../../../models/IDelivery'
import { IPayment } from '../../../models/IPayment'
import axios from 'axios'
import { getCookie } from '../../../Helpers/cookies'
import { useAppDispatch } from '../../../store/hooks/redux'
import { modalSlice } from '../../../store/reducers/client/ModalSlice'
import { notificationsSlice } from '../../../store/reducers/NotificationsSlice'
import { getImageFromJSON } from '../../../Helpers/getImageFromJSON'
import { getAuthURL } from '../../../services/URL'
// import { cityList } from "../../../Mocks/cityList";
import {useDebounce} from "../../../Helpers/useDebounce";

function validateEmail(email: string) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email.toLowerCase());
}

function Order() {

    const [fullname, setFullname] = useState('')
    const [email, setEmail] = useState('')
    const [city, setCity] = useState('')
    const [cityObject, setCityObject] = useState({})
    const [street, setStreet] = useState('')
    const [building, setBuilding] = useState('')
    const [flat, setFlat] = useState('')
    const [deliveryId, setDeliveryId] = useState<number>(0)
    const [paymentId, setPaymentId] = useState<number>(0)
    const [comment, setComment] = useState('')
    const [inputPhone, setInputPhone] = useState('+7(___)___-__-__')
    const [solutionId, setSolutionId] = useSearchParams()
    const navigate = useNavigate();
    const [createOrder] = drimoAPI.useCreateOrderMutation()
    const { data: deliveries, error: deliveries_error } = drimoAPI.useFetchDeliveryMethodsQuery('')
    const { data: payments, error: payments_error } = drimoAPI.useFetchPaymentMethodsQuery('')
    const { data: solution, error: solution_error } = drimoAPI.useFetchSolutionQuery({ id: solutionId.get('solution_id'), param: '', order: '' })
    const dispatch = useAppDispatch()
    const { changeLogin } = modalSlice.actions
    const { notificate } = notificationsSlice.actions
    const [autocompleteCity, setAutocompleteCity] = useState('');
    const [autocompleteStreet, setAutocompleteStreet] = useState('');
    const [preloader, setPreloader] = useState(true);
    const debouncedCity = useDebounce(autocompleteCity, 300);
    const debouncedStreet = useDebounce(autocompleteStreet, 300);
    const { data: cityList } = drimoAPI.useDeliveryCityQuery({ search: debouncedCity }, { skip: !debouncedCity.length });
    // @ts-ignore
    const { data: streetList } = drimoAPI.useDeliveryStreetQuery({ city: cityObject?.cityID, search: debouncedStreet }, { skip: !Object.keys(cityObject).length});
    const [cities, setCities] = useState([]);
    const [streets, setStreets] = useState([]);
    const { data: calculatorData } = drimoAPI.useCalculateAddressQuery({ city: city?.replace('г. ', ''), street, building, weight: getWeigth() }, { skip: !city.length || !street.length || !building.length });
    const inputCityRef = useRef(null);
    const inputStreetRef = useRef(null);
    const [validName, setValidName] = useState(false)
    const [validPhone, setValidPhone] = useState(false)
    const [validEmail, setValidEmail] = useState(false)
    /*const [validCity, setValidCity] = useState(false)
    const [validStreet, setValidStreet] = useState(false)*/
    const [validBuilding, setValidBuilding] = useState(false)
    /*const [validDeliveryId, setValidDeliveryId] = useState(false)*/
    const [validPaymentId, setValidPaymentId] = useState(false)
    const [deliveryPrice, setDeliveryPrice] = useState(0);
    const [userData, setUserData] = useState({
        full_name: '',
        phone: '',
        email: '',
    })
    const handleFullname = (value: string) => {
        setFullname(value)
    }

    (payments_error || deliveries_error) && dispatch(notificate({ title: 'Ошибка', isShown: true }));

    const handlePhone = (value: string) => {

        let _value = value.replace(/[^+\d]/g, '')
        if (_value.length <= 2) {
            setInputPhone('+7(')
        }
        if (_value.length > 2 && _value.length < 6) {
            setInputPhone('+7(' + _value.slice(2, 7))
        }
        if (_value.length >= 6 && _value.length < 9) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8))
        }
        if (_value.length >= 9 && _value.length < 11) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10))
        }
        if (_value.length >= 11 && _value.length < 13) {
            setInputPhone('+7(' + _value.slice(2, 5) + ')' + _value.slice(5, 8) + '-' + _value.slice(8, 10) + '-' + _value.slice(10, 12))
        }

    }

    const handleEmail = (value: string) => {
        setEmail(value)
    }

    const handleCity = (value: string) => {
        // setCity(value)
        setAutocompleteCity(value)
    }

    const handleStreet = (value: string) => {
        // setStreet(value)
        setAutocompleteStreet(value)
    }

    const handleBuilding = (value: string) => {
        setBuilding(value)
    }

    const handleFlat = (value: string) => {
        setFlat(value)
    }

    const handleComment = (value: string) => {
        setComment(value)
    }

    const handleDeliveryId = (id: number) => {
        setDeliveryId(id)
    }

    const handlePaymentId = (id: number) => {
        setPaymentId(id)
    }

    // @ts-ignore
    const handleSearchCity = (value) => {
        setCityObject(value)
        const newCity = value?.aString ?? '';
        setAutocompleteCity('')
        // @ts-ignore
        setCity(newCity)
        if (inputCityRef?.current) {
            // @ts-ignore
            inputCityRef.current.value = newCity;
        }
    }
    const handleSearchStreet = (value: string) => {
        setAutocompleteStreet('')
        setStreet(value)
        if (inputStreetRef?.current) {
            // @ts-ignore
            inputStreetRef.current.value = value;
        }
    }

    const validateFields = () => {

        let isValid = true;

        if ( fullname.length === 0 || fullname.length > 100 ) {
            setValidName(true)
            isValid = false;
        }
        
        if (email.length === 0 || email.length > 100 || !validateEmail(email) ) {
            setValidEmail(true)
            isValid = false;
        }
        if (inputPhone.replace(/[^+\d]/g, '').length !== 12) {
            setValidPhone(true)
            isValid = false;
        }
        /*if (city.length === 0 || city.length > 100) {
            setValidCity(true)
            isValid = false;
        }
        if (street.length === 0 || street.length > 100) {
            setValidStreet(true)
            isValid = false;
        }
        if (building.length === 0 || building.length > 100) {
            setValidBuilding(true)
            isValid = false;
        }
        if (deliveryId === 0) {
            setValidDeliveryId(true)
        }*/
        if (paymentId === 0) {
            setValidPaymentId(true)
            isValid = false;
        }

        if( flat.length > 100 ){
            isValid = false;
        }

        window.scrollTo({ top: 0, behavior: 'smooth' })

        return isValid;

    }

    const handleCreateOrder = async () => {

        if ( validateFields() ) {

            await createOrder(
                {
                    // @ts-ignore
                    city: city?.aString ?? '',
                    street: street,
                    building: building,
                    flat: flat,
                    solution_id: solutionId.get('solution_id'),
                    payment_id: paymentId,
                    delivery_id: deliveryId,
                    user_id: getCookie('userId'),
                    status: 1,
                    comment: comment,
                    email: email,
                    phone: inputPhone.replace(/[^+\d]/g, ''),
                    user_name: fullname
                })
            if (!userData.full_name && !userData.email) {
                await axios.post(`${getAuthURL()}/update_email/${getCookie('userId')}`,
                    {
                        email: email,
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${getCookie('apiToken')}`,
                            ID: `${getCookie('userId')}`
                        },

                    })
                    .then(async () => {
                        await axios.patch(`${getAuthURL()}/user_update/${getCookie('userId')}`,
                            {
                                full_name: fullname
                            },
                            {
                                headers: {
                                    Authorization: `Bearer ${getCookie('apiToken')}`,
                                    ID: `${getCookie('userId')}`
                                }
                            })
                            .then(() => { dispatch(notificate({ title: 'Успешно', isShown: true })) })

                    })
                    .catch(e => { dispatch(notificate({ title: 'Ошибка', isShown: true })); console.error(e) })

            }
            dispatch(notificate({ title: 'Заказ отправлен', isShown: true }));
            navigate('/')
        } else {
            dispatch(notificate({ title: 'Ошибка', isShown: true }));
        }
    }

    useEffect(() => {
        if (getCookie('userId')) {
            axios.get(`${getAuthURL()}/user_data`,
                {
                    headers: {
                        Authorization: `Bearer ${getCookie('apiToken')}`,
                        ID: `${getCookie('userId')}`
                    }
                }
            )
                .then(({ data }) => {
                    if (data) {
                        setFullname(data.full_name)
                        setInputPhone((`+7(${data.phone[2] ? data.phone[2] : '_'}${data.phone[3] ? data.phone[3] : '_'}${data.phone[4] ? data.phone[4] : '_'})${data.phone[5] ? data.phone[5] : '_'}${data.phone[6] ? data.phone[6] : '_'}${data.phone[7] ? data.phone[7] : '_'}-${data.phone[8] ? data.phone[8] : '_'}${data.phone[9] ? data.phone[9] : '_'}-${data.phone[10] ? data.phone[10] : '_'}${data.phone[11] ? data.phone[11] : '_'}`))
                        setEmail(data.email)
                        setUserData(data)
                    }

                })
                .catch((e) => {
                    console.log(e)
                    dispatch(notificate({ title: 'Ошибка', isShown: true }))
                })
        } else {
            navigate('/')
            dispatch(changeLogin(true))
            dispatch(notificate({ title: 'Войдите в аккаунт', isShown: true }))
        }

    }, []);

    useEffect(() => {
        setPreloader(true);

        // @ts-ignore
        if (cityList?.data) {
            // @ts-ignore
            setCities(cityList?.data);
            setPreloader(false);
        }
    }, [ cityList ]);

    useEffect(() => {
        setPreloader(true);

        // @ts-ignore
        if (streetList?.data) {
            // @ts-ignore
            setStreets(streetList?.data);
            setPreloader(false);
        }
    }, [ streetList ]);

    useEffect(() => {
        setPreloader(true);

        // @ts-ignore
        if (calculatorData?.data) {
            // @ts-ignore
            setDeliveryPrice(calculatorData?.data?.full_price)
        }
    }, [ calculatorData ]);

    function getWeigth() {
        console.log(solution)
        if (solution) {
            return solution.weight / 1000
            // let _weight = 0;
            // for (let part of solution.parts) {
            //     _weight += part.element_weigth * part.quantity
            // }
            // return _weight
        }
        return 0
    }

    function getQuantity() {
        if (solution) {
            let _quantity = 0;
            for (let part of solution.parts) {
                _quantity += part.quantity
            }
            return _quantity
        }
    }

    function getFinalPrice() {
        if (solution) {
            let _price = 0;
            for (let part of solution.parts) {
                _price += part.quantity * part.cost
            }
            return _price
        }

    }

    function getDeliveryPrice() {
        if (deliveries.find((el: IDelivery) => el.id === deliveryId)?.cost) {
            return Number(deliveries.find((el: IDelivery) => el.id === deliveryId)?.cost)
        } else return 0
    }

    return (
        deliveries &&
        <div className="order container" >
            <div className="order__header">
                <Link to="/" className="button-container">
                    <div className="button button_text">
                        <LeftSmallRedArrow />
                        На главную
                    </div>
                </Link>

                <div className="order__title page-title">Оформление заказа</div>
            </div>
            <div className="order__body">
                <div className="order__info">
                    {solution && <OrderEntity id={solution.id} isCopiable={false} title={solution.name} height={solution.height} width={solution.width} depth={solution.length} parts={solution.parts} image={solution.image} />}
                    <div className="order__section order-section">
                        <h5 className="order__title">Контактные данные</h5>
                        <div className="order__contacts order-section__container">
                            <div className="profile-section__form">
                                <div className="profile-section__input">
                                    <Input title="ФИО" isRequired={true} isLittle={false} onchange={handleFullname} value={fullname} onblur={() => { }} valid={validName} />
                                </div>
                                <div className="profile-section__input profile-section__input_half">
                                    <Input title="Телефон" isRequired={true} isLittle={false} onchange={handlePhone} value={inputPhone} onblur={() => { }} valid={validPhone} />
                                </div>
                                <div className="profile-section__input profile-section__input_half">
                                    <Input title="E-mail" isRequired={true} isLittle={false} onchange={handleEmail} value={email} onblur={() => { }} valid={validEmail} />
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="order__section order-section">
                        <h5 className="order__title">Доставка</h5>
                        <div className="order__address order-section__container">
                            <div className="profile-section__form">
                                {/*<Input title="Город" isRequired={true} isLittle={false} onchange={handleCity} value={city} onblur={() => { }} valid={validCity} />*/}
                                {/*<div className="profile-section__input">
                                    <div className="input__label label">
                                        <p className="label__title">Город доставки</p>
                                    </div>
                                    <div className="input__container">
                                        <select className="input__field" onChange={(e) => handleCity(e.target.value)}>
                                            <option value="">Выберите город</option>
                                            {
                                                cityList.sort((a, b) => a.name.localeCompare(b.name)).map((item) => {
                                                    return <option value={item.name}>{item.name}</option>;
                                                })
                                            }
                                        </select>
                                    </div>
                                </div>*/}
                                <div className="profile-section__input searchListWrapper">
                                    <div className="input__label label">
                                        <p className="label__title">Город доставки</p>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1989_27117)"><path d="M9.68945 4.20703L10.1484 5.66211L8.06836 6.30664L9.42578 8.25L8.17578 9.13867L6.81836 7.30273L5.42188 9.13867L4.17188 8.25L5.53906 6.30664L3.45898 5.66211L3.91797 4.20703L5.95898 4.87109V2.51758H7.64844V4.87109L9.68945 4.20703Z" fill="#E95526"></path></g><defs><clipPath id="clip0_1989_27117"><rect width="14" height="14" fill="white"></rect></clipPath></defs></svg>
                                    </div>
                                    <div className="input__container">
                                        <input type="text" ref={inputCityRef} className="input__field" placeholder="Начните вводить название населенного пункта..." onChange={(e) => handleCity(e.target.value)} />
                                    </div>
                                    { autocompleteCity.length > 0 && <div className="input__searchWrapper">
                                        <ul>
                                            { !preloader ? (
                                                cities.length > 0 ? cities.map((option) => {
                                                        // @ts-ignore
                                                        return <li value={option.cityID} onClick={() => handleSearchCity(option)}>{option.aString}</li>;
                                                    }) :
                                                    (
                                                        <li className="searchListFieldEmpty">Поиск не дал результатов</li>
                                                    )
                                            ) : (
                                                <li className="searchListFieldPreloader">
                                                    <img src="/assets/preloader.gif" width="24px" height="24px" />
                                                </li>
                                            )}
                                        </ul>
                                    </div>}
                                </div>
                                <div className="profile-section__input profile-section__input_two searchListWrapper">
                                    <div className="input__label label">
                                        <p className="label__title">Улица</p>
                                        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg"><g clip-path="url(#clip0_1989_27117)"><path d="M9.68945 4.20703L10.1484 5.66211L8.06836 6.30664L9.42578 8.25L8.17578 9.13867L6.81836 7.30273L5.42188 9.13867L4.17188 8.25L5.53906 6.30664L3.45898 5.66211L3.91797 4.20703L5.95898 4.87109V2.51758H7.64844V4.87109L9.68945 4.20703Z" fill="#E95526"></path></g><defs><clipPath id="clip0_1989_27117"><rect width="14" height="14" fill="white"></rect></clipPath></defs></svg>
                                    </div>
                                    <div className="input__container">
                                        <input type="text" ref={inputStreetRef} className="input__field" placeholder="Начните вводить название улицы..." onChange={(e) => handleStreet(e.target.value)} disabled={!Object.keys(cityObject).length} />
                                    </div>
                                    { autocompleteStreet.length > 0 && <div className="input__searchWrapper">
                                        <ul>
                                            { !preloader ? (
                                                streets.length > 0 ? streets.map((option) => {
                                                    // @ts-ignore
                                                    return <li value={option.aString} onClick={() => handleSearchStreet(option.aString)}>{option.aString}</li>;
                                                }) :
                                                (
                                                    <li className="searchListFieldEmpty">Поиск не дал результатов</li>
                                                )
                                            ) : (
                                                <li className="searchListFieldPreloader">
                                                    <img src="/assets/preloader.gif" width="24px" height="24px" />
                                                </li>
                                            )}
                                        </ul>
                                    </div>}
                                </div>
                                <div className="profile-section__input profile-section__input_two">
                                    <Input title="Дом/строение/корпус" isRequired={true} isLittle={false} onchange={handleBuilding} value={building} onblur={() => { }} valid={validBuilding} />
                                </div>
                                {/*<div className="profile-section__input profile-section__input_third">
                                    <Input title="Улица" isRequired={true} isLittle={false} onchange={handleStreet} value={street} onblur={() => { }} valid={validStreet} />
                                </div>
                                <div className="profile-section__input profile-section__input_third">
                                    <Input title="Дом/строение/корпус" isRequired={true} isLittle={false} onchange={handleBuilding} value={building} onblur={() => { }} valid={validBuilding} />
                                </div>
                                <div className="profile-section__input profile-section__input_third">
                                    <Input title="Квартира" isRequired={false} isLittle={false} onchange={handleFlat} value={flat} onblur={() => { }} />
                                </div>*/}
                                <p><b>Предварительная сумма доставки:</b> { deliveryPrice } ₽</p>
                            </div>
                        </div>
                    </div>
                    {/*<div className="order__section order-section">
                        <h5 className="order__title">Способ получения</h5>
                        <div className="order__delivery order-section__delivery ">
                            {
                                deliveries && deliveries.map((el: IDelivery) =>
                                    <DeliveryCard
                                        currentId={deliveryId}
                                        id={el.id}
                                        onPick={handleDeliveryId}
                                        title={el.title}
                                        isPickpoint={false}
                                        price={Number(el.cost)}
                                        period="3-4"
                                        info={el.description} />)
                            }

                        </div>
                        {
                            validDeliveryId && <div className="input__validation">Поле обязательно</div>

                        }
                    </div>*/}
                    <div className="order__section order-section">
                        <div className="page-subtitle">Способ оплаты</div>
                        <div className="order__payment order-section__delivery">
                            {
                                payments && payments.map((el: IPayment) => <DeliveryCard
                                    title={el.title}
                                    info={el.description}
                                    currentId={paymentId}
                                    id={el.id}
                                    onPick={handlePaymentId}
                                />)
                            }

                        </div>
                        {
                            validPaymentId && <div className="input__validation">Поле обязательно</div>

                        }
                    </div>
                    <div className="order__section order-section">
                        <h5 className="order__title">Дополнительно</h5>
                        <div className="order__comment order-section__container">
                            <Textarea isRequired={false} title='Комментарий к заказу' isLittle={false} onchange={handleComment} value={comment} />
                        </div>
                    </div>
                </div>
                <div className="summary-container">
                    <div className="order__summary">
                        <div className="order__price order-price">
                            <div className="order-price__container">
                                <ul className="order-price__list">
                                    <li className='order-price__list-item'>
                                        <p className="list-item__title">Доставка</p>
                                        {/*<p className="list-item__value">{getDeliveryPrice()} ₽</p>*/}
                                        <p className="list-item__value">{Math.floor(deliveryPrice)} ₽</p>
                                    </li>
                                    <li className='order-price__list-item'>
                                        <p className="list-item__title">Вес, кг</p>
                                        <p className="list-item__value">{getWeigth()} кг</p>
                                    </li>
                                    <li className='order-price__list-item'>
                                        <p className="list-item__title">Кол-во деталей</p>
                                        <p className="list-item__value">{getQuantity()} шт.</p>
                                    </li>
                                </ul>
                                <div className="order-price__sum">
                                    <p className='order-price__sum-title'>Итого</p>
                                    <h3 className='order-price__sum-value'>{(getFinalPrice()! + getDeliveryPrice()).toLocaleString() || 0} ₽</h3>
                                </div>
                            </div>

                            <div className="order-price__button">
                                <div className="button button_primary" onClick={handleCreateOrder}>Оформить заказ</div>
                            </div>
                        </div>
                        <div className="order__hint">
                            Нажимая на кнопку “Оформить заказ”, вы соглашаетесь на <Link to='/confidential-policy' className='red-text'>обработку персональных данных</Link> в соответствии с <Link to='/confidential-policy' className='red-text'>Условиями использования</Link> и соглашаетесь с <Link to='/oferta' className='red-text'>Договором оферты</Link>
                        </div>
                    </div>
                </div>

            </div>
        </div >
    )
}

export default Order