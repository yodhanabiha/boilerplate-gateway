import { Op } from "sequelize";
import DateUtility from "./DateUtility";
import CodebookDetail from "../models/entity/master/CodebookDetail";
import Codebook from "../models/entity/master/Codebook";
import Employee from "../models/entity/master/Employee";

import dayjs from "dayjs";
import utc from "dayjs/plugin/utc";
import timezone from "dayjs/plugin/timezone";
import { TokenPayload } from "../middleware/Authentication";

abstract class StringUtility {
  static generateRandomNumber(minLength: number = 10): number {
    const min = 10 ** (minLength - 1); // Smallest number with `minLength` digits
    const max = 10 ** minLength - 1; // Largest number with `minLength` digits
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  static setXAsTrue(value: string[]): boolean[] {
    const result = value.map(value => {
      if (value.toLowerCase() == 'x') return true;
      return undefined;
    }) as boolean[];
    return result;
  }

  static generateRandomCode(length: number) {
    const Charecters =
      'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let code = '';
    for (var i = 0, n = Charecters.length; i < length; ++i) {
      code += Charecters.charAt(Math.floor(Math.random() * n));
    }
    return code;
  }

  static getMonthsDifference(date1: Date, date2: Date) {
    const yearDiff = date2.getFullYear() - date1.getFullYear();
    const monthDiff = date2.getMonth() - date1.getMonth();
    return yearDiff * 12 + monthDiff;
  }

  static isUUID(text: string): boolean {
    const uuidRegex =
      /^[0-9a-fA-F]{8}-[0-9a-fA-F]{4}-[1-7][0-9a-fA-F]{3}-[89abAB][0-9a-fA-F]{3}-[0-9a-fA-F]{12}$/;

    return uuidRegex.test(text);
  }

  static camelCaseToTitleCase(text: string): string {
    return text
      .replace(/([A-Z])/g, ' $1')
      .replace(/^./, function (str) {
        return str.toUpperCase();
      })
      .trim();
  }

  static titleCaseToCamelCase(text: string) {
    return text
      .toLowerCase()
      .split(' ')
      .map((word, index) => {
        if (index === 0) {
          return word;
        }
        return word.charAt(0).toUpperCase() + word.slice(1);
      })
      .join('');
  }

  static snakeCaseToCamelCase(snakeStr: string): string {
    return snakeStr
      .toLowerCase()
      .replace(/(_\w)/g, matches => matches[1].toUpperCase());
  }

  static pascalCaseToSnakeCase(text: string) {
    return text
      .replace(/([A-Z])/g, '_$1')
      .toLowerCase()
      .replace(/^_/, '');
  }

  static pascalCaseToCamelCase(str: string) {
    return str.charAt(0).toLowerCase() + str.slice(1);
  }

  static pascalCaseToTitleCase(text: string) {
    let result = text.replace(/([a-z])([A-Z])/g, '$1 $2').trim();
    result = result.replace(/\b\w/g, char => char.toUpperCase());
    return result;
  }

  static snakeCaseToPascalCase(snake: string): string {
    return snake
      .split('_')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  static titleCaseToPascalCase(text: string) {
    return text
      .split(' ')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase())
      .join('');
  }

  static formatRupiah(numberData: number) {
    return `Rp ${numberData.toLocaleString('id')}`;
  }

  static deg2rad(deg: number) {
    return deg * (Math.PI / 180)
  }

  static getDiffMinutes(date1: Date | string, date2: Date | string, timezoneText: string = 'Asia/Jakarta') {
    dayjs.extend(utc);
    dayjs.extend(timezone);
    const d1 = dayjs.tz(date1, timezoneText);
    const d2 = dayjs.tz(date2, timezoneText);
    const diff = d2.diff(d1, "minute");
    return diff;
  }

  static getDistanceFromLtLnInMeter(lat1: number, lon1: number, lat2: number, lon2: number) {
    const R = 6371000; // radius bumi (meter)
    const toRad = (deg: number) => deg * Math.PI / 180;

    const dLat = toRad(lat2 - lat1);
    const dLon = toRad(lon2 - lon1);

    const a =
      Math.sin(dLat / 2) ** 2 +
      Math.cos(toRad(lat1)) *
      Math.cos(toRad(lat2)) *
      Math.sin(dLon / 2) ** 2;

    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return Math.round(R * c); // meter
  }

  static async getCodebookItems(identity: TokenPayload, codeMaster: string) {
    const codebook = await Codebook.findOne({ where: { code: codeMaster, companyId: identity.companySelected?.id } });
    let dataReturn: any; dataReturn = {};
    if (codebook) {
      const codebookDetail = await CodebookDetail.findAll({ where: { codebookId: codebook.id, companyId: identity.companySelected?.id } });
      for (let rawCode of codebookDetail) {
        if (dataReturn[rawCode.textCode] == undefined) {
          dataReturn[rawCode.textCode] = {};
        }
        dataReturn[rawCode.textCode] = rawCode
      }
    }
    return dataReturn;
  }

}

export default StringUtility;
