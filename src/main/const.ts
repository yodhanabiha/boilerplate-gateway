import { TokenPayload } from './middleware/Authentication';

export type StatusCode =
  | 100
  | 101
  | 102
  | 200
  | 201
  | 202
  | 203
  | 204
  | 205
  | 206
  | 207
  | 208
  | 226
  | 300
  | 301
  | 302
  | 303
  | 304
  | 305
  | 307
  | 308
  | 400
  | 401
  | 402
  | 403
  | 404
  | 405
  | 406
  | 407
  | 408
  | 409
  | 410
  | 411
  | 412
  | 413
  | 414
  | 415
  | 416
  | 417
  | 418
  | 421
  | 422
  | 423
  | 424
  | 426
  | 428
  | 429
  | 431
  | 451
  | 500
  | 501
  | 502
  | 503
  | 504
  | 505
  | 506
  | 507
  | 508
  | 510
  | 511;

export const FormDocumentStatus: Record<number, string> = Object.freeze({
  0: 'Draft',
  1: 'Process',
  2: 'Rendering',
  3: 'Calculation',
  4: 'Success',
  5: 'Failed',
  6: 'Finish',
  7: 'Canceled',
});

export const form_document_status_str = (flag: number) => {
  return FormDocumentStatus[flag] ?? 'Draft';
};

export const FormVariableType: Record<number, string> = Object.freeze({
  1: 'Text',
  2: 'Single',
  3: 'Multiple',
});

export const form_variable_type_str = (flag: number) => {
  return FormVariableType[flag] ?? 'Text';
};

export function base_url(path: string) {
  const app = require('express')
  return `${app.locals.baseUrl}${path}`;
}

export const UsersStatusList = [
  "NOT ACTIVED",
  "ACTIVED",
  "NEED VERIFICATION",
  "BANNED"
] as const

export const UsersTypeList = [
  "PERSONAL",
  "COMPANY"
] as const

export const EmailStatusSenderTypeList = [
  "DRAFT",
  "WAITING",
  "PROCESSED",
  "SUCCESS",
  "ERROR",
  "RESENDER"
] as const

export const EmailSenderTypeList = [
  "VERIFICATION ACCOUNT",
  "FORGOT PASSWORD",
  "APPROVAL",
  "INVOICE AP",
  "INVOICE AR",
  "PAYMENT INVOICE"
] as const

export const OrganizationTypeList = [
  "DEPARTMENT",
  "DIVISI",
  "UNIT",
  "POSITION"
] as const

export const CodeFormatDateTypeList = [
  "MMYY",
  "YYMM",
  "MMYYYY"
] as const

export const StatusActiveTypeList = [
  "ACTIVE",
  "DEACTIVE"
] as const


export const ShiftTypeList = [
  "FIXED TIME",
  "FLEXTIME"
] as const


export const ShiftDateTypeList = [
  "WORK DAYS",
  "OFF DAYS"
] as const


export const ShiftGroupTypeList = [
  "FIXED SHIFT",
  "SCHEDULE SHIFT",
  "FREE SHIFT",
] as const


export const AttendanceTypeList = [
  "IN",
  "OUT",
  "APPROVAL",
  "NOTED",
  "BREAK",
  "DONE"
] as const


export const ShiftTimeTypeList = [
  "SAME DAY",
  "NEXT DAY"
] as const

export const DaysTypeList = [
  "MONDAY",
  "TUESDAY",
  "WEDNESDAY",
  "THURSDAY",
  "FRIDAY",
  "SATURDAY",
  "SUNDAY"
] as const


export const AttendanceEmployeeSourceByTypeList = [
  "SHIFT GROUP",
  "SHIFT"
] as const

export const LeaveApplicableScopeList = [
  "ALL",
  "CUSTOM"
] as const

export const LeaveMinimumList = [
  "DAY",
  "HALF DAY"
] as const

export const LeaveLimitList = [
  "LIMITED",
  "UNLIMITED"
] as const

export const LeaveEmployeeStatusList = [
  "WAITING APPROVAL",
  "APPROVED",
  "REJECTED",
  "ON HOLD"
] as const

export const WorkfkowTypeList = [
  "DEFAULT",
  "RATTING"
] as const

export const ConditionOperatorTypeList = [
  "!=",
  "==",
  ">=",
  "<=",
  "<",
  ">",
  "IN",
  "NOT IN",
  "LIKE"
] as const

export const PersonTypeList = [
  "USER",
  "FIELD",
  "ROLES"
] as const

export const RejectTypeList = [
  "PREVIOUS",
  "ALL",
  "GROUP"
] as const

export const ApprovalStatusTypeList = [
  "WAITING APPROVAL",
  "APPROVED",
  "REJECTED",
  "ON HOLD"
] as const

export const ApprovalHistoryStatusTypeList = [
  "WAITING APPROVAL",
  "APPROVED",
  "REJECTED",
  "ON HOLD"
] as const


export interface hitoryObject {
  label: string;
  status: typeof ApprovalHistoryStatusTypeList[number];
  atCreate: Date;
  message?: string;
  user?: {
    id: string;
    name: string;
    email: string;
  }
}[]

export const NotificationCategoryList = [
  "TOPIC",
  "PERSON"
] as const

export const LeaveTimeLimitToSubmitList = [
  "UNLIMITED",
  "BEFORE",
  "AFTER"
] as const

export const LeaveCycleList = [
  "ANNUALLY",
  "SEMI-ANNUALLY",
  "MONTHLY"
] as const

export const LeaveStartFromList = [
  "EMPLOYEE JOIN",
  "SPECIFIED DATE"
] as const

export const ReimburseStatusList = [
  "WAITING APPROVAL",
  "APPROVED",
  "REJECTED",
  "ON HOLD"
] as const

export const PurchaseRequestStatusList = [
  "WAITING APPROVAL",
  "APPROVED",
  "REJECTED",
  "ON HOLD"
] as const

export const AccrualCycleList = [
  "ANNUALLY",
  "SEMI-ANNUALLY",
  "MONTHLY",
] as const

export const AccrualStartFromList = [
  "EMPLOYEE JOIN",
  "SPECIFIED DATE",
] as const


export const MaxDurationConditionMaxTypeList = [
  "IN YEAR",
  "IN MONTH"
] as const

export const TimeLimitToSubmitList = [
  "UNLIMITED",
  "BEFORE",
  "AFTER"
] as const

export const StatusLeaveQuotaTypeList = [
  "ACTIVE",
  "NOT ACTIVED",
  "EXPIRED"
] as const

export const HolidayTypeList = [
  "ALL",
  "EXCLUDE",
  "INCLUDE"
] as const

export const HolidayStatusList = [
  "ACTIVED",
  "NOT ACTIVED",
  "EXPIRED"
] as const


export const AttendanceEmployeeStatusList = [
  "WAITING APPROVAL",
  "APPROVED",
  "REJECTED",
  "ON HOLD"
] as const

export const CompanyStatusList = [
  "ACTIVED",
  "PENDING",
  "DUE SOON",
  "SUSPENDED",
  "TERMINATED",
  "CANCELED"
] as const

export const VersionCategoryList = [
  "ANDROID",
  "IOS"
] as const
