export type TCard = {
    _id: string;
    name: string;
    type: string;
    calories: number;
    proteins: number;
    fat: number;
    carbohydrates: number;
    price: number;
    image: string;
    image_mobile: string;
    image_large: string;
    __v: number;
    uuid: string;
};

export type TUser = {
    email: string;
    name: string;
};

export type TUserRegisterInfo = {
    password: string;
} & TUser;

export type TUserLoginInfo = {
    email: string;
    password: string;
};

export type TServerSuccessfulResponse<T> = {
    success: boolean;
} & T;

export type TUserResponse = TServerSuccessfulResponse<{
    user: TUser;
}>;

export type TUserResponseWithToken = TServerSuccessfulResponse<{
    user: TUser;
    accessToken: string;
    refreshToken: string;
}>;

export type TRefreshResponseWithToken = TServerSuccessfulResponse<{
    accessToken: string;
    refreshToken: string;
}>;

export type TUserResetPassword = {
    password: string;
    token: string;
};

export type TUserForgotPassword = {
    email: string;
};

export type wsPayloadConnect = {
    wsUrl: string;
    withTokenRefresh: boolean
};

export type TOrder = {
    _id: string;
    ingredients: string[];
    status: string;
    name: string;
    createdAt: Date;
    updatedAt: Date;
    number: number;
};

export type TOrderList = {
    success: boolean;
    orders: TOrder[];
    total: number;
    totalToday: number;
};