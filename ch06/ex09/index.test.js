test('test', () => {

    const mock = jest.fn();

    const obj = {
    x: 0,
    y: 0,
    sum() {
        mock();
        return this.x + this.y;
    },
    };

    // ここに１行のコードを書く // sumプロパティをゲッターとして再定義
    Object.defineProperty(obj, 'sum', { get() { return mock(), this.x + this.y }, enumerable: true });

    obj.x = 1;
    obj.y = 2;
    expect(JSON.stringify(obj)).toBe(`{"x":1,"y":2,"sum":3}`);
    expect(mock).toHaveBeenCalled();

});