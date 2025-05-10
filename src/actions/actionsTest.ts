'use server';

export async function testUpload(formData: FormData) {
      const name = formData.get('name');
      console.log({ formData });
}