import { NextRequest, NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';


export async function POST(
    request: NextRequest,
    { params }: { params: Promise<{ shareId: string }> }
) {
    // Получаем shareId из параметров URL
    const { shareId } = await params;
    
    // Достаем токен из кук на сервере
    const cookiesStore = await cookies();
    const token = cookiesStore.get('token')?.value;

    try {
        // 1. Получаем FormData, который прислал клиент с файлом
        const formData = await request.formData();

        // 2. Отправляем файл дальше на ваш основной бэкенд
        // (Используйте переменную окружения для URL вашего Node.js сервера)
        const fileApiUrl = process.env.NEXT_PUBLIC_SERVER_FILE_API_URL

        const response = await axios.post(`${fileApiUrl}/api/fileLoad/${shareId}`, formData, {
            headers: {
                // Прокидываем JWT-токен авторизации
                authorization: `Bearer ${token}`,
                // Важно: передаем заголовки запроса клиента (включая boundary для FormData), 
                // чтобы axios на бэкенде понял, как парсить мультипарт-запрос.
                // Next.js автоматически генерирует правильный тип для formData.
            },
        });

        // 3. Возвращаем ответ от вашего основного сервера клиенту
        return NextResponse.json(response.data);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    } catch (error: any) {
        console.log(error);
        
        // Безопасно передаем текст ошибки клиенту
        const status = error.response?.status || 500;
        //'Внутренняя ошибка сервера'
        const message = error.response?.data?.msg || error.message;

        return NextResponse.json({ error: message }, { status });
    }
}