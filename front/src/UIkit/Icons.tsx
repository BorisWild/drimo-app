export function CatalogIcon(props: any) {
    const { color } = props
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill="none" />
            <path d="M2 6H18" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <path d="M2 14H18" stroke={color} strokeWidth="2" strokeLinecap="square" />
        </svg>
    )
}

export function SettingsIcon(props: any) {
    const { color } = props
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M2 6H11M18 6H15" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <path d="M2 14H5M18 14H9" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <circle cx="13" cy="6" r="2" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="7" cy="14" r="2" stroke={color} strokeWidth="2" />
        </svg>

    )
}

export function ArrowDownIcon(props: any) {
    const { color, rotate } = props;
    return (
        <svg className={`arrow ${rotate ? 'arrow_active' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill="white" />
            <path d="M15 7.5L10 12.5L5 7.5" stroke={color} strokeWidth="2" strokeLinecap="square" />
        </svg>
    )
}

export function SavedIcon(props: any) {
    const { color } = props;
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 19V1H15.625L19 4.48387V19H1Z" stroke={color} strokeWidth="2" />
            <path d="M4 5H9" stroke={color} strokeWidth="2" />
            <circle cx="10" cy="12" r="3" stroke={color} strokeWidth="2" />
        </svg>
    )
}

export function UserIcon(props: any) {
    const { color } = props;
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1950_4978)">
                <circle cx="10" cy="5" r="4" stroke={color} strokeWidth="2" />
                <path d="M1 19L2.28571 13H17.7143L19 19" stroke={color} strokeWidth="2" strokeLinecap="square" />
            </g>
            <defs>
                <clipPath id="clip0_1950_4978">
                    <rect width="20" height="20" fill="white" />
                </clipPath>
            </defs>
        </svg>
    )
}

export function ArrowRightIcon(props: any) {
    const { color } = props;
    return (
        <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M19.7071 4L31.4142 15.7071L19.7071 27.4142L18.2929 26L27.5858 16.7071H1V14.7071H27.5858L18.2929 5.41421L19.7071 4Z" fill={color} />
        </svg>

        // <svg className="arrow-right-icon" width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg">
        //     <rect width="32" height="32" fill="none" />
        //     <path d="M1 16H30M30 16L19 5M30 16L19 27" stroke={color} strokeWidth="2" />
        // </svg>
    )
}

export function MenuIcon(props: any) {
    const { color } = props;
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill="none" />
            <path d="M2 3H18" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <path d="M2 17H18" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <path d="M2 10H18" stroke={color} strokeWidth="2" strokeLinecap="square" />
        </svg>
    )
}

export function WhatsAppIcon(props: any) {
    const { color } = props;
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M14.5817 11.985C14.3308 11.86 13.1092 11.2625 12.8817 11.18C12.6542 11.0958 12.4875 11.055 12.3208 11.305C12.1567 11.5508 11.6783 12.1083 11.5342 12.2733C11.3883 12.4358 11.2433 12.4483 10.9958 12.3358C10.7458 12.2108 9.94333 11.9483 8.99333 11.0983C8.25333 10.4358 7.75667 9.62333 7.61 9.37333C7.465 9.12333 7.59417 8.98583 7.71833 8.86083C7.83167 8.74833 7.96917 8.57333 8.09417 8.425C8.21583 8.27417 8.25583 8.17417 8.34167 8.01167C8.425 7.83667 8.3825 7.69917 8.32083 7.575C8.25833 7.45 7.76083 6.225 7.5525 5.73667C7.3525 5.25 7.14667 5.31167 6.9925 5.31167C6.84917 5.29917 6.68333 5.29917 6.51667 5.29917C6.35 5.29917 6.08083 5.36083 5.8525 5.59833C5.625 5.84833 4.98167 6.44833 4.98167 7.66083C4.98167 8.87333 5.87333 10.0483 5.9975 10.2233C6.12167 10.3858 7.75167 12.8858 10.2475 13.9608C10.8425 14.2108 11.3058 14.3608 11.6675 14.485C12.2625 14.6742 12.805 14.6475 13.2342 14.5858C13.7125 14.51 14.7067 13.985 14.9142 13.3975C15.1267 12.81 15.1267 12.3225 15.0642 12.21C15.0025 12.0975 14.8392 12.035 14.5892 11.9225L14.5817 11.985ZM10.0508 18.125H10.0375C8.5625 18.125 7.10083 17.725 5.825 16.975L5.525 16.7967L2.4 17.6092L3.2375 14.5717L3.03833 14.2592C2.21333 12.9458 1.775 11.4333 1.775 9.87583C1.775 5.33833 5.4875 1.63833 10.06 1.63833C12.2717 1.63833 14.3475 2.50083 15.9108 4.06333C17.4733 5.6125 18.335 7.68833 18.335 9.88833C18.3317 14.425 14.6183 18.1258 10.0558 18.1258L10.0508 18.125ZM17.1 2.87417C15.2 1.0375 12.7 0 10.0375 0C4.5525 0 0.0866667 4.445 0.0841667 9.91083C0.0841667 11.6575 0.541667 13.3608 1.41333 14.865L0 20L5.27917 18.6233C6.73417 19.4092 8.37083 19.8267 10.0375 19.8292H10.0425C15.53 19.8292 19.9975 15.3825 20 9.91583C20 7.26917 18.9667 4.77833 17.0875 2.90667" fill={color} />
        </svg>
    )
}

export function TelegramIcon(props: any) {
    const { color } = props;
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M0.353259 9.61978L4.96167 11.4542L6.7454 17.5721C6.85954 17.964 7.3088 18.1088 7.607 17.8488L10.1758 15.6154C10.4451 15.3814 10.8286 15.3697 11.11 15.5876L15.7432 19.1751C16.0622 19.4224 16.5141 19.236 16.5941 18.8249L19.9882 1.41301C20.0756 0.963941 19.6618 0.589313 19.2609 0.754693L0.347859 8.53599C-0.118874 8.72796 -0.114808 9.43271 0.353259 9.61978ZM6.45793 10.4777L15.4645 4.56162C15.6263 4.45561 15.7929 4.68903 15.6539 4.82654L8.22087 12.1954C7.9596 12.4548 7.79107 12.8019 7.74334 13.1786L7.49014 15.1798C7.4566 15.447 7.10467 15.4735 7.03554 15.215L6.06173 11.5657C5.9502 11.1495 6.11273 10.7049 6.45793 10.4777Z" fill={color} />
        </svg>

    )
}

export function VkIcon(props: any) {
    const { color } = props;
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.9368 10.7343C15.6458 10.3843 15.729 10.2286 15.9368 9.91571C15.9405 9.91214 18.3428 6.75071 18.5904 5.67857L18.5919 5.67786C18.7149 5.28714 18.5919 5 17.9971 5H16.029C15.528 5 15.297 5.24643 15.1732 5.52214C15.1732 5.52214 14.1712 7.80643 12.7537 9.28714C12.2961 9.715 12.0846 9.85214 11.8349 9.85214C11.7119 9.85214 11.5206 9.715 11.5206 9.32429V5.67786C11.5206 5.20929 11.3804 5 10.9656 5H7.87099C7.55673 5 7.36997 5.21857 7.36997 5.42214C7.36997 5.86643 8.07875 5.96857 8.15225 7.21857V9.93071C8.15225 10.525 8.03899 10.6343 7.78774 10.6343C7.11871 10.6343 5.49491 8.34071 4.53262 5.71571C4.33837 5.20643 4.14861 5.00071 3.64384 5.00071H1.67502C1.11325 5.00071 1 5.24714 1 5.52286C1 6.01 1.66902 8.43214 4.11111 11.6321C5.73866 13.8164 8.03074 15 10.1158 15C11.3691 15 11.5221 14.7371 11.5221 14.285C11.5221 12.1979 11.4089 12.0007 12.0366 12.0007C12.3276 12.0007 12.8287 12.1379 13.9987 13.1914C15.336 14.4407 15.5558 15 16.3043 15H18.2723C18.8334 15 19.1176 14.7371 18.9541 14.2186C18.5799 13.1279 16.0508 10.8843 15.9368 10.7343Z" fill={color} />
        </svg>
    )
}

export function YoutubeIcon(props: any) {
    const { color } = props;
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15.8463 2.92188H4.15374C1.85969 2.92188 0 4.78157 0 7.07562V12.9206C0 15.2147 1.85969 17.0744 4.15374 17.0744H15.8463C18.1403 17.0744 20 15.2147 20 12.9206V7.07562C20 4.78157 18.1403 2.92188 15.8463 2.92188ZM13.0371 10.2825L7.56814 12.8909C7.42241 12.9604 7.25408 12.8541 7.25408 12.6927V7.31293C7.25408 7.1492 7.42684 7.04308 7.57287 7.11709L13.0418 9.8885C13.2044 9.97088 13.2016 10.2041 13.0371 10.2825Z" fill={color} />
        </svg>
    )
}

export function MapPinIcon() {
    return (
        <svg className="mappin-icon" width="64" height="77" viewBox="0 0 64 77" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path fillRule="evenodd" clipRule="evenodd" d="M64 0H0V64H25L32 77L39 64H64V0Z" fill="#E92627" />
            <path d="M29.8733 22C32.1139 22 34.0719 22.4327 35.7473 23.2982C37.4429 24.1436 38.7449 25.3714 39.6533 26.9816C40.5818 28.5717 41.0461 30.4335 41.0461 32.567C41.0461 34.7006 40.5818 36.5523 39.6533 38.1223C38.7449 39.6923 37.4429 40.8999 35.7473 41.7453C34.0719 42.5705 32.1139 42.9831 29.8733 42.9831H23V22H29.8733ZM29.8733 40.1753C32.3359 40.1753 34.2233 39.5111 35.5354 38.1827C36.8474 36.8542 37.5035 34.9824 37.5035 32.567C37.5035 30.1316 36.8474 28.2295 35.5354 26.8608C34.2233 25.4922 32.3359 24.8078 29.8733 24.8078H26.4518V40.1753H29.8733Z" fill="white" />
        </svg>
    )
}

export function Settings16Icon(props: any) {
    const { color } = props;
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 4H9M15 4H13" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <path d="M1 12L3 12M15 12H7" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <circle cx="11" cy="4" r="2" stroke={color} strokeWidth="2" strokeLinecap="round" />
            <circle cx="5" cy="12" r="2" stroke={color} strokeWidth="2" />
        </svg>
    )
}

export function RedArrowDownIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1.25 1.25L18.75 18.75M18.75 18.75V5.625M18.75 18.75H6.875" stroke="#E95526" strokeWidth="2" />
        </svg>

    )
}

export function ExitIcon(props: any) {
    const { color } = props
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="20" height="20" fill="none" />
            <path d="M2 10L11 10M2 10L6.5 5M2 10L6.5 15" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <path d="M9 1H18V19H9" stroke={color} strokeWidth="2" />
        </svg>

    )
}

export function OrdersIcon(props: any) {
    const { color } = props
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke={color} strokeWidth="2" />
            <path d="M6 9.25L9.46154 13L15 7" stroke={color} strokeWidth="2" />
        </svg>
    )

}

export function RequiredIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_1989_27117)">
                <path d="M9.68945 4.20703L10.1484 5.66211L8.06836 6.30664L9.42578 8.25L8.17578 9.13867L6.81836 7.30273L5.42188 9.13867L4.17188 8.25L5.53906 6.30664L3.45898 5.66211L3.91797 4.20703L5.95898 4.87109V2.51758H7.64844V4.87109L9.68945 4.20703Z" fill="#E95526" />
            </g>
            <defs>
                <clipPath id="clip0_1989_27117">
                    <rect width="14" height="14" fill="white" />
                </clipPath>
            </defs>
        </svg>

    )
}

export function LeftSmallRedArrow() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 10H16" stroke="#E92627" strokeWidth="2" strokeLinecap="square" />
            <path d="M9 5L4 10L9 15" stroke="#E92627" strokeWidth="2" strokeLinecap="square" />
        </svg>

    )
}

export function RightSmallRedArrow() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 10H4" stroke="#E92627" strokeWidth="2" strokeLinecap="square" />
            <path d="M11 5L16 10L11 15" stroke="#E92627" strokeWidth="2" strokeLinecap="square" />
        </svg>

    )
}

export function DownRedArrow(props: any) {
    const { isActive } = props
    return (
        <svg className={`spec-icon ${isActive ? 'spec-icon_active' : ''}`} width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M15 7.5L10 12.5L5 7.5" stroke="#E92627" strokeWidth="2" strokeLinecap="square" />
        </svg>
    )
}

export function RadioButtonIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white" />
            <circle cx="12" cy="12" r="11" fill="white" stroke="#D0D0D0" strokeWidth="2" />
        </svg>
    )
}

export function RadioButtonActiveIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect width="24" height="24" fill="white" />
            <circle cx="12" cy="12" r="12" fill="#E92627" />
            <path d="M8 12L11 15L17 9" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
    )
}

export function CloseIcon(props: any) {
    const { color } = props;
    return (
        < svg className="close-icon" width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg" >
            <path d="M4.34277 4.34375L15.6565 15.6575" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <path d="M4.34375 15.6562L15.6575 4.34254" stroke={color} strokeWidth="2" strokeLinecap="square" />
        </ svg>
    )


}


export function TexturesIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M9.50024 6C7.50011 8.5 5.50012 9 2.50012 10C3.00012 12.5 4.13328 13.5474 5.50011 15.5L8.50012 14.5L7.50011 17L9.00018 18.5001C12.0002 16.5001 14.0002 13.5001 14.3745 11.1923L9.50024 6Z" stroke="black" strokeWidth="2" />
            <path d="M14 5.94975L18.9497 1" stroke="black" strokeWidth="2" />
            <path d="M10.9248 3L16.8492 8.92462" stroke="black" strokeWidth="2" />
        </svg>

    )
}

export function PlusCircleIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="black" strokeWidth="2" />
            <path d="M7 10H13" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
            <path d="M10 7L10 13" stroke="black" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
        </svg>

    )
}

export function DeliveryIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="5" cy="17" r="2" stroke="black" strokeWidth="2" />
            <circle cx="16" cy="17" r="2" stroke="black" strokeWidth="2" />
            <path d="M19 15H1V3H13V6H16L19 9V15Z" stroke="black" strokeWidth="2" />
        </svg>

    )
}

export function RoubleCircleIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <circle cx="10" cy="10" r="9" stroke="black" strokeWidth="2" />
            <path d="M8 15V6H11C12.1046 6 13 6.89543 13 8V8C13 9.10457 12.1046 10 11 10H6.5" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            <path d="M6.5 13H10" stroke="black" strokeWidth="2" strokeLinecap="round" />
        </svg>
    )


}

export function SortArrowIcon(props: any) {
    const { color, sort } = props;
    return (
        <svg className={`sort-icon sort-icon_${sort}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 11L4 5H12L8 11Z" fill={color} />
        </svg>
    )
}

export function AddIcon(props: any) {
    const { color } = props;
    return (
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M8 3V13" stroke={color} strokeWidth="2" strokeLinecap="square" />
            <path d="M3 8L13 8" stroke={color} strokeWidth="2" strokeLinecap="square" />
        </svg>

    )
}

export function FilterArrowIcon(props: any) {
    const { isActive, color } = props;
    return (
        <svg className={`filter-arrow ${isActive ? 'filter-arrow_active' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6L8 11L13 6" stroke={color || '#000000'} strokeWidth="2" strokeLinecap="square" />
        </svg>
    )
}

export function SelectArrowIcon(props: any) {
    const { isActive } = props;
    return (
        <svg className={`select-arrow ${isActive ? 'select-arrow_active' : ''}`} width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6L8 11L13 6" stroke={'#A1A1A1'} strokeWidth="2" strokeLinecap="square" />
        </svg>
    )
}

export function CheckIcon() {
    return (
        <svg width="14" height="14" viewBox="0 0 14 14" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 7L6 10L12 4" stroke="white" strokeWidth="2" strokeLinecap="square" />
        </svg>

    )
}

export function SortIcon() {
    return (
        <svg width="17" height="16" viewBox="0 0 17 16" fill="none" xmlns="http://www.w3.org/2000/svg">
            <g clipPath="url(#clip0_2364_3789)">
                <path d="M4.5 -3.49691e-07L8.5 6L0.5 6L4.5 -3.49691e-07Z" fill="#E92627" />
                <path d="M12.5 16L16.5 10L8.5 10L12.5 16Z" fill="#E92627" />
                <path d="M4.5 6V15" stroke="#E92627" strokeWidth="2" />
                <path d="M12.5 10V1" stroke="#E92627" strokeWidth="2" />
            </g>
            <defs>
                <clipPath id="clip0_2364_3789">
                    <rect width="16" height="16" fill="white" transform="translate(0.5)" />
                </clipPath>
            </defs>
        </svg>

    )
}

export function BoxIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M3 6.14286L10.5 1L18 6.14286M3 6.14286L10.5 11.2857M3 6.14286V13.8571L10.5 19M18 6.14286L10.5 11.2857M18 6.14286V13.8571L10.5 19M10.5 11.2857V19" stroke="black" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>

    )
}

export function DocumentIcon() {
    return (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M13.6154 2H14.3333L19 6.28571V7.55556M13.6154 2H5V22H19V7.55556M13.6154 2V7.55556H19" stroke="#C4C4C4" strokeWidth="2" />
        </svg>

    )
}

export function DeleteIcon({ onclick }: any) {
    return (
        <div className="delete-icon" onClick={onclick}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M4 4L12 12" stroke="#777777" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
                <path d="M4 12L12 4" stroke="#777777" strokeWidth="2" strokeLinecap="square" strokeLinejoin="round" />
            </svg>
        </div>
    )
}

export function ImageIcon() {
    return (
        <svg width="20" height="20" viewBox="0 0 20 20" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M5 19H19V13M5 19H1V1H19V13M5 19L15 9L19 13" stroke="#D0D0D0" strokeWidth="2" />
            <circle cx="7" cy="7" r="2" stroke="#D0D0D0" strokeWidth="2" />
        </svg>
    )
}