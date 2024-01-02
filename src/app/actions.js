'use server';

import { revalidateTag } from "next/cache";

export default async function getGivenSubjects(){
    revalidateTag('getGivenSubjects');
}