export class Subject
{

    id : string = 'empty';
    title : string = '';
    description : string = '';
    course_id : string = '';
    course_title ?: any = '';
    serial_no : any = '';
    topic_count : string = '';
    status : string = '';
    created_at : string = '';
    updated_at : string = '';
    deleted_at : string = '';

    //optional parameters
    teacher_id ?: number = 0;
    teacher_title ?: string = '';
    

    constructor() {}

    
}
