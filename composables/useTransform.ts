export const useTransform = () => {

    function toCelcium(temp: number): number{
        return Number((temp - 273.15).toFixed(1))
    }
    function tranformTime(time: number): object{
        const date = new Date(time * 1000);

        // Вказуємо формат та часовий пояс
        const optionsDate: Intl.DateTimeFormatOptions = {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
        };

        // Опції для часу
        const optionsTime: Intl.DateTimeFormatOptions = {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false, // Використання 24-годинного формату
        };

        const dateString = date.toLocaleDateString('uk-UA', optionsDate);
        const timeString = date.toLocaleTimeString('uk-UA', optionsTime);


        return { date: dateString, time: timeString };
    }


    return{
        toCelcium,
        tranformTime,
    }
}