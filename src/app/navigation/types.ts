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
}