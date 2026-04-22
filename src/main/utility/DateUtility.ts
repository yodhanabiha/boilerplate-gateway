import { CodeFormatDateTypeList } from "../const";

abstract class DateUtility {
  static timeDifference(date1: Date, date2: Date) {
    const diff = Math.abs(date2.getTime() - date1.getTime());

    const hours = Math.floor(diff / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor(((diff % 3600000) % 60000) / 1000);

    return hours + 'h ' + minutes + 'm ' + seconds + 's';
  }

  static getDateNow() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedTanggal = `${year}-${month}-${day}`;
    const formattedPeriode = `${year}-${month}`;
    const formattedTanggalTime = `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;


    return { periode: formattedPeriode, tanggal: formattedTanggal, tanggal_time: formattedTanggalTime, time: formattedTime };
  }

  static getDateNowExcelMt100() {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    const formattedTanggalTime = `${year}/${month}/${day}_${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    return formattedTanggalTime;
  }

  static getFormatCodeDate(format: string) {
    const date = new Date();
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedTanggal = `${year}-${month}-${day}`;
    const formattedPeriode = `${year}-${month}`;
    const formattedTanggalTime = `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const monthText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];

    let formatCode = "";
    switch (format) {
      case "DDMMYY":
        formatCode += day.toString() + "" + month.toString() + "" + year.toString().substring(2, 4);
        break;
      case "MMYY":
        formatCode += month.toString() + "" + year.toString().substring(2, 4);
        break;
      case "MMYYYY":
        formatCode += month.toString() + "" + year.toString();
        break;
      case "YYYYMM":
        formatCode += month.toString() + "" + year.toString();
        break;
      case "YYYYMMDD":
        formatCode += year.toString() + month.toString() + "" + day.toString();
        break;
      case "DD MMMM YYYY":
        formatCode += day.toString() + " " + monthText[date.getMonth()] + " " + year.toString();
        break;
      default:
        formatCode += month.toString() + "" + year.toString().substring(2, 4);
        break;
    }

    return formatCode;
  }

  static getFormatDate(dates: Date, format: string) {
    const date = new Date(dates);
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');

    const formattedTanggal = `${year}-${month}-${day}`;
    const formattedPeriode = `${year}-${month}`;
    const formattedTanggalTime = `${year}-${month}-${day} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
    const formattedTime = `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;

    const monthText = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    const dayText = ["SUNDAY", "MONDAY", "TUESDAY", "WEDNESDAY", "THURSDAY", "FRIDAY", "SATURDAY"]
    let formatCode = "";
    switch (format) {
      case "DAY":
        formatCode += dayText[date.getDay()];
        break;
      case "DD":
        formatCode += day.toString()
        break;
      case "DDMMYY":
        formatCode += day.toString() + "" + month.toString() + "" + year.toString().substring(2, 4);
        break;
      case "MM-YY":
        formatCode += month.toString() + "-" + year.toString().substring(2, 4);
        break;
      case "MM-YYYY":
        formatCode += month.toString() + "-" + year.toString();
        break;
      case "YYYY-MM":
        formatCode += year.toString() + "-" + month.toString();
        break;
      case "YYYY-MM-DD":
        formatCode += year.toString() + "-" + month.toString() + "-" + day.toString();
        break;
      case "YYYYMMDD":
        formatCode += year.toString() + "" + month.toString() + "" + day.toString();
        break;
      case "MM":
        formatCode += month.toString();
        break;
      case "YYYY":
        formatCode += year.toString();
        break;
      case "DD MMMM YYYY":
        formatCode += day.toString() + " " + monthText[date.getMonth()] + " " + year.toString();
        break;
      default:
        formatCode += year.toString() + "-" + month.toString() + "-" + day.toString();
        break;
    }

    return formatCode;
  }

  static getTotalDays(start: Date, end: Date) {
    const startDate = new Date(start);
    const endDate = new Date(end);
    const diffTime = endDate.getTime() - startDate.getTime();
    return Math.floor(diffTime / (1000 * 60 * 60 * 24)) + 1;
  }

  static getMonthRange(period: string) {
    // period format: "2026-02"
    const [year, month] = period.split("-").map(Number);
    const start = new Date(year, month - 1, 1);
    start.setHours(0, 0, 0, 0);
    const end = new Date(year, month, 0); // last day of month
    end.setHours(23, 59, 59, 999);
    return { start, end };
  }

  static getDateRangeLoop(startDate: Date, endDate: Date) {
    const dates = [];
    let currentDate = new Date(startDate);
    const lastDate = new Date(endDate);

    while (currentDate <= lastDate) {
      dates.push(new Date(currentDate)); // simpan salinan tanggal
      currentDate.setDate(currentDate.getDate() + 1);
    }

    return dates;
  }

  static getYearDiff(startDate: Date, endDate: Date) {
    const startYear = new Date(startDate).getFullYear();
    const endYear = new Date(endDate).getFullYear();

    return endYear - startYear;
  }

  static getDateRange(period: string) {
    const now = new Date();
    let start, end;

    switch (period) {
      case "today":
        start = new Date(now.setHours(0, 0, 0, 0));
        end = new Date();
        break;

      case "yesterday":
        start = new Date();
        start.setDate(start.getDate() - 1);
        start.setHours(0, 0, 0, 0);

        end = new Date(start);
        end.setHours(23, 59, 59, 999);
        break;

      case "7_days":
        start = new Date();
        start.setDate(start.getDate() - 7);
        end = new Date();
        break;

      case "30_days":
        start = new Date();
        start.setDate(start.getDate() - 30);
        end = new Date();
        break;

      case "this_week":
        const day = now.getDay(); // 0 = Sunday
        const diff = now.getDate() - day + (day === 0 ? -6 : 1); // Monday start
        start = new Date(now.setDate(diff));
        start.setHours(0, 0, 0, 0);
        end = new Date();
        break;

      case "last_week":
        const lastWeekStart = new Date();
        lastWeekStart.setDate(lastWeekStart.getDate() - 7);

        const dayLW = lastWeekStart.getDay();
        const diffLW = lastWeekStart.getDate() - dayLW + (dayLW === 0 ? -6 : 1);

        start = new Date(lastWeekStart.setDate(diffLW));
        start.setHours(0, 0, 0, 0);

        end = new Date(start);
        end.setDate(start.getDate() + 6);
        end.setHours(23, 59, 59, 999);
        break;

      case "this_month":
        start = new Date(now.getFullYear(), now.getMonth(), 1);
        end = new Date();
        break;

      case "last_month":
        start = new Date(now.getFullYear(), now.getMonth() - 1, 1);
        end = new Date(now.getFullYear(), now.getMonth(), 0);
        end.setHours(23, 59, 59, 999);
        break;

      default:
        throw new Error("Invalid period");
    }

    return { start, end };
  }


}

export default DateUtility;
