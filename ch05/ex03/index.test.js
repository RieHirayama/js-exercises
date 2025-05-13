import { calendar1, calendar2 } from './index.js';

describe('calendar1.is31DaysMonth (if-else version)', () => {
    test('31 days', () => {
        expect(calendar1.is31DaysMonth("Jan")).toBe(true);
        expect(calendar1.is31DaysMonth("Mar")).toBe(true);
        expect(calendar1.is31DaysMonth("May")).toBe(true);
        expect(calendar1.is31DaysMonth("Jul")).toBe(true);
        expect(calendar1.is31DaysMonth("Aug")).toBe(true);
        expect(calendar1.is31DaysMonth("Oct")).toBe(true);
        expect(calendar1.is31DaysMonth("Dec")).toBe(true);
    });

    test('28 days,30 days', () => {
        expect(calendar1.is31DaysMonth("Feb")).toBe(false);
        expect(calendar1.is31DaysMonth("Apr")).toBe(false);
        expect(calendar1.is31DaysMonth("Jun")).toBe(false);
        expect(calendar1.is31DaysMonth("Sep")).toBe(false);
        expect(calendar1.is31DaysMonth("Nov")).toBe(false);
    });

    test('月以外', () => {
        expect(calendar1.is31DaysMonth("")).toBe(false);
        expect(calendar1.is31DaysMonth(null)).toBe(false);
        expect(calendar1.is31DaysMonth(undefined)).toBe(false);
    });
});

describe('calendar2.is31DaysMonth (switch version)', () => {
    test('31 days', () => {
        expect(calendar2.is31DaysMonth("Jan")).toBe(true);
        expect(calendar2.is31DaysMonth("Mar")).toBe(true);
        expect(calendar2.is31DaysMonth("May")).toBe(true);
        expect(calendar2.is31DaysMonth("Jul")).toBe(true);
        expect(calendar2.is31DaysMonth("Aug")).toBe(true);
        expect(calendar2.is31DaysMonth("Oct")).toBe(true);
        expect(calendar2.is31DaysMonth("Dec")).toBe(true);
    });

    test('28 days,30 days', () => {
        expect(calendar2.is31DaysMonth("Feb")).toBe(false);
        expect(calendar2.is31DaysMonth("Apr")).toBe(false);
        expect(calendar2.is31DaysMonth("Jun")).toBe(false);
        expect(calendar2.is31DaysMonth("Sep")).toBe(false);
        expect(calendar2.is31DaysMonth("Nov")).toBe(false);
    });

    test('月以外', () => {
        expect(calendar2.is31DaysMonth("")).toBe(false);
        expect(calendar2.is31DaysMonth(null)).toBe(false);
        expect(calendar2.is31DaysMonth(undefined)).toBe(false);
    });
});