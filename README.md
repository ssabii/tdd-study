# TDD
켄트 벡 아저씨의 [테스트 주도 개발(Test-Driven Development)](https://product.kyobobook.co.kr/detail/S000001032985)을 공부한 레포지토리입니다.   
책에서는 자바로 테스트를 작성하지만, 여기서는 TypeScript, Jest로 테스트를 작성하였습니다.

Jest를 사용해서 다음과 같은 방법으로 테스트를 작성합니다.
```ts
describe("다중 화폐 예제", () => {
  test("multiplication", () => {
    const five = new Dollar(5);
    five.times(2);
    expect(five.amount).toBe(10);
  })
})
```