export const RollingNumber = ({ number }: { number: number }) => {
  const chars = String(number).split("");

  return (
    <div className="relative inline-flex items-center">
      <span className="sr-only">{number}</span>
      <div className="flex" aria-hidden="true">
        {chars.map((char, i) => {
          // 숫자인 경우 애니메이션이 적용된 Digit 컴포넌트 사용
          if (/\d/.test(char)) {
            return <Digit key={i} value={Number(char)} />;
          }

          // 부호(-), 소수점(.) 등 기호는 일반 텍스트로 렌더링하여 에러 방지
          return (
            <div
              key={i}
              className="tabular-nums"
              style={{ height: "1em", lineHeight: "1" }}
            >
              {char}
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Digit = ({ value }: { value: number }) => {
  return (
    <div
      className="overflow-hidden tabular-nums"
      style={{
        height: "1em",
        lineHeight: "1",
      }}
    >
      <div
        className="flex flex-col"
        style={{
          transform: `translateY(-${value}em)`,
          transition: "transform 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
        }}
      >
        {[0, 1, 2, 3, 4, 5, 6, 7, 8, 9].map((n) => (
          <div key={n} style={{ height: "1em", display: "flex", alignItems: "center", justifyContent: "center" }}>
            {n}
          </div>
        ))}
      </div>
    </div>
  );
};
