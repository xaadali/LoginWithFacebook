export enum SSOType {
  User = "user",
  Company = "company",
}

export enum CHAT_SOCKET_TYPES {
  USER_CONNECT = "user-connect",
  ALL_ROOMS_LISTING = "all-rooms-listing",
  SUBSCRIBE_TO_CHAT = "subscribe-to-chat",
  ENTER_CHAT_ROOM = "enter-chat-room",
  ALL_MESSAGES = "all-messages",
  NEW_MESSAGE = "new-user-message",
  ALL_ROOMS = "all-rooms",
  CHAT_ROOM_CHANGED = "chat-room-changed",
  CLEAR_RECENT_MESSAGE = "clear-recent-message",
  USER_BLOCKED = "userBlocked",
  ADD_USER_MESSAGE = "add-user-message",
  ENTER_USER_ROOM = "enter-user-room",
  LEAVE_USER_ROOM = "leave-user-room",
}

export enum GOOGLE_API_KEY {
  API_KEY = "AIzaSyA5EUIP04j8lgG9Vl6Fdc2YidPS8LKBOsQ",
}
export enum PlanTypeEnum {
  StarterPlan = "Starter Plan",
  ProfessionalPlan = "Professional Plan",
  EnterprisePlan = "Enterprise Plan",
}
export const PAYMENT = {
  PAYPAL: "USD",
  STRIPE: "usd",
};
export const Filter = {
  Recently: "Recently",
  Top_Reveiws: "Top Reveiws",
};

export const ApikeyStripe = "";

export const getInitials = (name = "") =>
  name
    .replace(/\s+/, " ")
    .split(" ")
    .slice(0, 1)
    .map((v) => v && v[0].toUpperCase())
    .join("");

export const CountryOption = [
  { name: "United States" },
  { name: "Afghanistan" },
  { name: "land Islands" },
  { name: "Albania" },
  { name: "Algeria" },
  { name: "American Samoa" },
  { name: "AndorrA" },
  { name: "Angola" },
  { name: "Anguilla" },
  { name: "Antarctica" },
  { name: "Antigua and Barbuda" },
  { name: "Argentina" },
  { name: "Armenia" },
  { name: "Aruba" },
  { name: "Australia" },
  { name: "Austria" },
  { name: "Azerbaijan" },
  { name: "Bahamas" },
  { name: "Bahrain" },
  { name: "Bangladesh" },
  { name: "Barbados" },
  { name: "Belarus" },
  { name: "Belgium" },
  { name: "Belize" },
  { name: "Benin" },
  { name: "Bermuda" },
  { name: "Bhutan" },
  { name: "Bolivia" },
  { name: "Bosnia and Herzegovina" },
  { name: "Botswana" },
  { name: "Bouvet Island" },
  { name: "Brazil" },
  { name: "British Indian Ocean Territory" },
  { name: "Brunei Darussalam" },
  { name: "Bulgaria" },
  { name: "Burkina Faso" },
  { name: "Burundi" },
  { name: "Cambodia" },
  { name: "Cameroon" },
  { name: "Canada" },
  { name: "Cape Verde" },
  { name: "Cayman Islands" },
  { name: "Central African Republic" },
  { name: "Chad" },
  { name: "Chile" },
  { name: "China" },
  { name: "Christmas Island" },
  { name: "Cocos (Keeling) Islands" },
  { name: "Colombia" },
  { name: "Comoros" },
  { name: "Congo" },
  { name: "Congo, The Democratic Republic of the" },
  { name: "Cook Islands" },
  { name: "Costa Rica" },
  { name: "Cote" },
  { name: "Croatia" },
  { name: "Cuba" },
  { name: "Cyprus" },
  { name: "Czech Republic" },
  { name: "Denmark" },
  { name: "Djibouti" },
  { name: "Dominica" },
  { name: "Dominican Republic" },
  { name: "Ecuador" },
  { name: "Egypt" },
  { name: "El Salvador" },
  { name: "Equatorial Guinea" },
  { name: "Eritrea" },
  { name: "Estonia" },
  { name: "Ethiopia" },
  { name: "Falkland Islands (Malvinas)" },
  { name: "Faroe Islands" },
  { name: "Fiji" },
  { name: "Finland" },
  { name: "France" },
  { name: "French Guiana" },
  { name: "French Polynesia" },
  { name: "French Southern Territories" },
  { name: "Gabon" },
  { name: "Gambia" },
  { name: "Georgia" },
  { name: "Germany" },
  { name: "Ghana" },
  { name: "Gibraltar" },
  { name: "Greece" },
  { name: "Greenland" },
  { name: "Grenada" },
  { name: "Guadeloupe" },
  { name: "Guam" },
  { name: "Guatemala" },
  { name: "Guernsey" },
  { name: "Guinea" },
  { name: "Guinea-Bissau" },
  { name: "Guyana" },
  { name: "Haiti" },
  { name: "Heard Island and Mcdonald Islands" },
  { name: "Holy See (Vatican City State)" },
  { name: "Honduras" },
  { name: "Hong Kong" },
  { name: "Hungary" },
  { name: "Iceland" },
  { name: "India" },
  { name: "Indonesia" },
  { name: "Iran, Islamic Republic Of" },
  { name: "Iraq" },
  { name: "Ireland" },
  { name: "Isle of Man" },
  { name: "Israel" },
  { name: "Italy" },
  { name: "Jamaica" },
  { name: "Japan" },
  { name: "Jersey" },
  { name: "Jordan" },
  { name: "Kazakhstan" },
  { name: "Kenya" },
  { name: "Kiribati" },
  { name: "Korea" },
  { name: "Korea, Republic of" },
  { name: "Kuwait" },
  { name: "Kyrgyzstan" },
  { name: "Lao" },
  { name: "Latvia" },
  { name: "Lebanon" },
  { name: "Lesotho" },
  { name: "Liberia" },
  { name: "Libyan Arab Jamahiriya" },
  { name: "Liechtenstein" },
  { name: "Lithuania" },
  { name: "Luxembourg" },
  { name: "Macao" },
  { name: "Macedonia, The Former Yugoslav Republic of" },
  { name: "Madagascar" },
  { name: "Malawi" },
  { name: "Malaysia" },
  { name: "Maldives" },
  { name: "Mali" },
  { name: "Malta" },
  { name: "Marshall Islands" },
  { name: "Martinique" },
  { name: "Mauritania" },
  { name: "Mauritius" },
  { name: "Mayotte" },
  { name: "Mexico" },
  { name: "Micronesia, Federated States of" },
  { name: "Moldova, Republic of" },
  { name: "Monaco" },
  { name: "Mongolia" },
  { name: "Montenegro" },
  { name: "Montserrat" },
  { name: "Morocco" },
  { name: "Mozambique" },
  { name: "Myanmar" },
  { name: "Namibia" },
  { name: "Nauru" },
  { name: "Nepal" },
  { name: "Netherlands" },
  { name: "Netherlands Antilles" },
  { name: "New Caledonia" },
  { name: "New Zealand" },
  { name: "Nicaragua" },
  { name: "Niger" },
  { name: "Nigeria" },
  { name: "Niue" },
  { name: "Norfolk Island" },
  { name: "Northern Mariana Islands" },
  { name: "Norway" },
  { name: "Oman" },
  { name: "Pakistan" },
  { name: "Palau" },
  { name: "Palestinian Territory, Occupied" },
  { name: "Panama" },
  { name: "Papua New Guinea" },
  { name: "Paraguay" },
  { name: "Peru" },
  { name: "Philippines" },
  { name: "Pitcairn" },
  { name: "Poland" },
  { name: "Portugal" },
  { name: "Puerto Rico" },
  { name: "Qatar" },
  { name: "Reunion" },
  { name: "Romania" },
  { name: "Russian Federation" },
  { name: "RWANDA" },
  { name: "Saint Helena" },
  { name: "Saint Kitts and Nevis" },
  { name: "Saint Lucia" },
  { name: "Saint Pierre and Miquelon" },
  { name: "Saint Vincent and the Grenadines" },
  { name: "Samoa" },
  { name: "San Marino" },
  { name: "Sao Tome and Principe" },
  { name: "Saudi Arabia" },
  { name: "Senegal" },
  { name: "Serbia" },
  { name: "Seychelles" },
  { name: "Sierra Leone" },
  { name: "Singapore" },
  { name: "Slovakia" },
  { name: "Slovenia" },
  { name: "Solomon Islands" },
  { name: "Somalia" },
  { name: "South Africa" },
  { name: "South Georgia and the South Sandwich Islands" },
  { name: "Spain" },
  { name: "Sri Lanka" },
  { name: "Sudan" },
  { name: "Suriname" },
  { name: "Svalbard and Jan Mayen" },
  { name: "Swaziland" },
  { name: "Sweden" },
  { name: "Switzerland" },
  { name: "Syrian Arab Republic" },
  { name: "Taiwan, Province of China" },
  { name: "Tajikistan" },
  { name: "Tanzania, United Republic of" },
  { name: "Thailand" },
  { name: "Timor-Leste" },
  { name: "Togo" },
  { name: "Tokelau" },
  { name: "Tonga" },
  { name: "Trinidad and Tobago" },
  { name: "Tunisia" },
  { name: "Turkey" },
  { name: "Turkmenistan" },
  { name: "Turks and Caicos Islands" },
  { name: "Tuvalu" },
  { name: "Uganda" },
  { name: "Ukraine" },
  { name: "United Arab Emirates" },
  { name: "United Kingdom" },
  { name: "United States" },
  { name: "United States Minor Outlying Islands" },
  { name: "Uruguay" },
  { name: "Uzbekistan" },
  { name: "Vanuatu" },
  { name: "Venezuela" },
  { name: "Viet Nam" },
  { name: "Virgin Islands, British" },
  { name: "Virgin Islands, U.S." },
  { name: "Wallis and Futuna" },
  { name: "Western Sahara" },
  { name: "Yemen" },
  { name: "Zambia" },
  { name: "Zimbabwe" },
];
export const CategoryOptions = [
  { value: "Car", label: "Car" },
  { value: "Motorcycle", label: "Motorcycle" },
  { value: "Agriculture", label: "Agriculture" },
  { value: "Truck", label: "Truck" },
  { value: "Bus", label: "Bus" },
  { value: "Van", label: "Van" },
  { value: "Laundry", label: "Laundry" },
];

export const CarSubCategory = [
  { value: "Fast mechanics", label: "Fast mechanics" },
  { value: "General mechanics", label: "General mechanics" },
  { value: "Tires", label: "Tires" },
  { value: "Sheet metal and paint", label: "Sheet metal and paint" },
  { value: "Electromechanical", label: "Electromechanical" },
];
export const BikeSubCategory = [
  { value: "General mechanics", label: "General mechanics" },
  { value: "Tires", label: "Tires" },
  { value: "Sheet metal and paint", label: "Sheet metal and paint" },
];
export const AgriculturalSubCategory = [
  { value: "Tractor General Mechanics", label: "Tractor General Mechanics" },
  { value: "Hydraulics", label: "Hydraulics" },
  { value: "Welding", label: "Welding" },
  { value: "Electromechanical", label: "Electromechanical" },
  { value: "Gardening", label: "Gardening" },
];
export const TruckSubCategory = [
  { value: "General mechanics", label: "General mechanics" },
  { value: "Sheet metal and paint", label: "Sheet metal and paint" },
  { value: "Tires", label: "Tires" },
  { value: "Pneumatic", label: "Pneumatic" },
  { value: "Electromechanical", label: "Electromechanical" },
];
export const BusSubCategory = [
  { value: "General mechanics", label: "General mechanics" },
  { value: "Sheet metal and paint", label: "Sheet metal and paint" },
  { value: "Tires", label: "Tires" },
  { value: "Pneumatic", label: "Pneumatic" },
  { value: "Electromechanical", label: "Electromechanical" },
];
export const VanSubCategory = [
  { value: "Fast mechanic", label: "Fast mechanic" },
  { value: "General mechanics", label: "General mechanics" },
  { value: "Tires", label: "Tires" },
  { value: "Sheet metal and paint", label: "Sheet metal and paint" },
];
export const LaundrySubCategory = [
  { value: "Car", label: "Car" },
  { value: "Motorcycle", label: "Motorcycle" },
  { value: "Van", label: "Van" },
  { value: "Truck", label: "Truck" },
  { value: "Bus", label: "Bus" },
  { value: "Cisterns", label: "Cisterns" },
  { value: "Agricultural", label: "Agricultural" },
];
export const RadiusOption = [
  { value: 10, label: 100 },
  { value: 20, label: 20 },
  { value: 30, label: 30 },
  { value: 40, label: 40 },
  { value: 50, label: 50 },
  { value: 60, label: 60 },
  { value: 70, label: 70 },
  { value: 80, label: 90 },
  { value: 90, label: 90 },
  { value: 100, label: 100 },
];
export const countryOptionsforWorkshop = [
  {
    value: "spain",
    label: "spain",
  },
];

export const accordionData = [
  {
    title: "Car",
    content: CarSubCategory,
  },
  {
    title: "Motorcycle",
    content: BikeSubCategory,
  },
  {
    title: "Agriculture",
    content: AgriculturalSubCategory,
  },
  {
    title: "Truck",
    content: TruckSubCategory,
  },
  {
    title: "Bus",
    content: BusSubCategory,
  },
  {
    title: "Van",
    content: VanSubCategory,
  },
  {
    title: "Laundry",
    content: LaundrySubCategory,
  },
];

export const pendingStatus = ["Canceled", "InProgress"];
export const InprogressStatus = [
  "Blocked",
  "Client Not Presented",
  "completed",
];
export const UpcommingStatus = ["pending", "Inprogress", "Canceled", "Blocked"];
export const CompletedStatus = ["Completed"];
export const CancelStatus = ["Canceled"];
export const BlockedStatus = ["Blocked"];

export const generateRandomIp = () => {
  let RandomIp =
    Math.floor(Math.random() * 255) +
    1 +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255) +
    "." +
    Math.floor(Math.random() * 255);
  return RandomIp;
};
