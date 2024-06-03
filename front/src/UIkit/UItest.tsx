import React from 'react'
import TableFilter from './TableFilter/TableSort'

import DeliveryCard from './DeliveryCard/DeliveryCard'
import Input from './Inputs/Input'
import Textarea from './Inputs/Textarea'
import Notification from './Notification/Notification'
import Pagination from './Pagination/Pagination'
import Table from './Table/Table'
import TableRow from './TableRow/TableRow'
import TagsList from './Tags/TagsList'

const FilterMock = [
    // {
    //     width: 2,
    //     params: [{ param: 'Фото', isSortable: false }]
    // },
    {
        width: 3,
        params: [{ param: 'Название', isSortable: true }, { param: 'ID', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Кол-во, шт', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Вес, г', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Цена', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Сортировка', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Кол-во, шт', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Вес, г', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Вес, г', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Посл. изменение', isSortable: true }]
    },
    {
        width: 3,
        params: [{ param: 'Добавлено', isSortable: false }]
    },
]

const TableDataMock = [
    // {
    //     image: '../assets/catalog-img-1.png',
    //     title: 'Название шкафа',
    //     id: 12345678,
    //     payload: [
    //         {
    //             title: 'Кол-во, шт',
    //             value: '100',
    //         },
    //         {
    //             title: 'Цена, руб',
    //             value: '2000',
    //         },
    //         {
    //             title: 'Цена, руб',
    //             value: '2000',
    //         },
    //         {
    //             title: 'Цена, руб',
    //             value: '2000',
    //         },
    //     ],
    //     created: '2022-06-01T06:36:13.000000Z',
    //     updated: '2022-06-01T06:36:13.000000Z',
    // },
    {
        title: 'Какой-то заголовок',
        id: 9876543,
        payload: [
            {
                title: 'Высота, мм',
                value: '1000',
            },
            {
                title: 'Ширина, мм',
                value: '1244',
            },
            {
                title: 'Длина, мм',
                value: '2333',
            },
            {
                title: 'Цена, руб',
                value: '1245000',
            },
            {
                title: 'Высота, мм',
                value: '1000',
            },
            {
                title: 'Ширина, мм',
                value: '1244',
            },
            {
                title: 'Ширина, мм',
                value: '1244',
            },
        ],
        created: '2022-06-01T06:36:13.000000Z',
        updated: '2022-06-01T06:36:13.000000Z',
    },
]

function UItest() {
    return (
        <div className="ui container">
            <div className="ui-ui">
                <div className="button-container">
                    <div className="button button_primary">
                        Кнопка
                    </div>
                </div>
                <div className="button-container">
                    <div className="button button_secondary">
                        Кнопка
                    </div>
                </div>
                <div className="button-container">
                    <div className="button button_secondary2">
                        Кнопка
                    </div>
                </div>
                <div className="button-container">
                    <div className="button button_secondary3">
                        Кнопка
                    </div>
                </div>
                <div className="button-container">
                    <div className="button button_text">
                        Кнопка
                    </div>
                </div>
                <TagsList tags={[{ title: 'Тег тест' }]} type="default" />
                <TagsList tags={[{ title: 'Тег тест', count: 1 }]} type="tinted" />
                <Pagination total={5} onclick={undefined} current={0} />
                {/* <Notification message='Уведомление' isShown={true} /> */}
                {/* <DeliveryCard title="Тестовая" info="Описание" isPickpoint={true} price={54221} period='6 - 7' /> */}
                <Input isLittle={false} isRequired={true} title={'Заголовок инпута'} />
                <Input isLittle={true} isRequired={true} title={'Заголовок инпута'} />
                <Textarea isLittle={false} isRequired={false} title={'Заголовок текстареи'} />
                <div className="page-title">
                    Заголовок
                    <div className="title-counter">1</div>
                </div>

                {/* <Table data={TableDataMock} sort={FilterMock} /> */}

                {/* <div className="table">
                    <TableFilter filters={FilterMock} />
                    <div className="table__body">

                        <TableRow firstWidth={3} title={'Заголовок'} id={0} additional={MockTable} type={'UI'} />
                    </div>
                </div> */}



            </div>
        </div>
    )
}

export default UItest