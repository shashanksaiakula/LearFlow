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
        courseId : number
    }
    LessonPlayer:{
        lessonId : number,
        courseId : number
    },
    BottomTab : undefined,
     EditProflie : undefined,
    ChangePassword : undefined
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