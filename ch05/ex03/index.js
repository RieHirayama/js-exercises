// 1. "Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"のいずれかの文字列リテラルを受け取って、
// その月の日数が31であれば true、そうでなければ false を返すメソッドを書きなさい。
// if-else を使うバージョンと switch を使うバージョンの両方を作りなさい。

// if-elseを使うバージョン
const calendar1 = {
    is31DaysMonth(month) {
        if (month === "Jan" || month === "Mar" || month === "May" || month === "Jul" || 
            month === "Aug" || month === "Oct" || month === "Dec") {
            return true;
        } else if (month === "Feb" || month === "Apr" || month === "Jun" || 
                   month === "Sep" || month === "Nov") {
            return false;
        } else {
            return false;
        }
    }
};

// switchを使うバージョン
const calendar2 = {
    is31DaysMonth(month) {
        switch (month) {
            case "Jan":
            case "Mar":
            case "May":
            case "Jul":
            case "Aug":
            case "Oct":
            case "Dec":
                return true;
            case "Feb":
            case "Apr":
            case "Jun":
            case "Sep":
            case "Nov":
                return false;
            default:
                return false;
        }
    }
};

export { calendar1, calendar2 };