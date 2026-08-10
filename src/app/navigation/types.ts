import { NavigatorScreenParams } from '@react-navigation/native';

export type RootStackParamList ={
    Login : undefined;
    Home : {
        user:{
            id : number,
            name : string,
            age: number
        },
        // cources : string[],
        // isLoggendIn : Boolean
    }
    CourseDetails :{
        courseId : string,
        progress : number,
        isEnrolled : boolean
    }
    LessonPlayer:{
        lessonId : number,
        courseId : number
    },
    BottomTab :  NavigatorScreenParams<BottomTabParamsList>; 
     EditProflie : undefined,
    ChangePassword : undefined,
    Checkout :{
        amount : number,
        cousreCode :string
    },
    Payment : {
        amount : number,
         cousreCode :string
    }
    PaymentSuccess : undefined
}

export type AuthStackParamsList= {
     Login : undefined;
     Register : undefined;
     Forgot : undefined
}

export type BottomTabParamsList ={
       Home : {
        user:{
            id : number,
            name : string,
            age: number
        },
    }
    ProfileStack : undefined,
    courses : undefined,
    myLearning : undefined,
    bookmarks : undefined
}

export type ProfileStackParamList={
     Profile : undefined,
    EditProflie : undefined,
    ChangePassword : undefined
}