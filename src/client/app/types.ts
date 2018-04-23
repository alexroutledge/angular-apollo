/*
 * Copyright (c) 2018 Company Name.
 * All rights reserved.
 *
 * Company Name and the Company Name logo are trademarks
 * or registered trademarks of Company Name
 * or its affiliates in the U.S. and other countries.
 * Other names may be trademarks of their respective owners.
 *
 * WATERMARK
 */

export interface Course {
    id: number;
    title: string;
    author: string;
    description: string;
    topic: string;
    url: string;
}

export interface Query {
    allCourses: Course[];
}
