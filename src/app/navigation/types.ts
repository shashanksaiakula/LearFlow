import { NavigatorScreenParams } from '@react-navigation/native';
import { Course } from '../models/course';

export type RootStackParamList = {
    Login: undefined;
    Home: {
        user: {
            id: number,
            name: string,
            age: number
        },
        // cources : string[],
        // isLoggendIn : Boolean
    }
    CourseDetails: {
        courseId: string,
        progress: number,
        isEnrolled: boolean,
        currentLessonCode: string,
        currentLessonPosition: number,
        isBookmarked? : boolean
    }
    LessonPlayer: {
        lessonId: string,
        courseId: string,
        currentLessonPosition: number
    },
    BottomTab: NavigatorScreenParams<BottomTabParamsList>;
    EditProflie: undefined,
    ChangePassword: undefined,
    Checkout: {
        amount: number,
        courseCode: string,
        lessonId: string,
    },
    Payment: {
        amount: number,
        courseCode: string,
        lessonId: string,
    }
    PaymentSuccess: undefined,
    RecommendedForYotScreen:{
        cousres : Course[]
    }
}

export type AuthStackParamsList = {
    Login: undefined;
    Register: undefined;
    Forgot: undefined,
    EmailVerification: {
        email: string
    }
    ResetPassword: undefined
}

export type BottomTabParamsList = {
    Home: {
        user: {
            id: number,
            name: string,
            age: number
        },
    }
    ProfileStack: undefined,
    courses: undefined,
    myLearning: undefined,
    bookmarks: undefined
}

export type ProfileStackParamList = {
    Profile: undefined,
    EditProflie: undefined,
    ChangePassword: undefined
}