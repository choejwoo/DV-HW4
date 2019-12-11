// javascript
var day = [];
var a = [0,0,0,0,0,0,0,0,0,0,0,0];

d3.csv("dataSet.csv", function(data) {
  data.forEach(function(d) {
    if (d.가해자_당사자종별_대분류 == "승용차") {
      a[0]++;
    } else if (d.가해자_당사자종별_대분류 == "화물차") {
      a[1]++;
    } else if (d.가해자_당사자종별_대분류 == "이륜차") {
      a[2]++;
    } else if (d.가해자_당사자종별_대분류 == "승합차") {
      a[3]++;
    } else if (d.가해자_당사자종별_대분류 == "자전거") {
      a[4]++;
    } else if (d.가해자_당사자종별_대분류 == "건설기계") {
      a[5]++;
    } else if (d.가해자_당사자종별_대분류 == "원동기장치자전거") {
      a[6]++;
    } else if (d.가해자_당사자종별_대분류 == "농기계") {
      a[7]++;
    } else if (d.가해자_당사자종별_대분류 == "사륜오토바이(ATV)") {
      a[8]++;
    } else if (d.가해자_당사자종별_대분류 == "특수차") {
      a[9]++;
    }  else if (d.가해자_당사자종별_대분류 == "불명") {
      a[10]++;
    } else if (d.가해자_당사자종별_대분류 == "개인형이동수단(PM)") {
      a[11]++;
    } else if (d.가해자_당사자종별_대분류 == "기타") {
      a[12]++;
    }
  });

  day.push({x:'승용차', y:a[0]});
  day.push({x:'화물차 ', y:a[1]});
  day.push({x:'이륜차', y:a[2]});
  day.push({x:'승합차', y:a[3]});
  day.push({x:'원동기장치자전거', y:a[6]});
  day.push({x:'자전거', y:a[4]});
  day.push({x:'건설기계', y:a[5]});
  day.push({x:'농기계', y:a[7]});
  day.push({x:'특수차', y:a[9]});
  day.push({x:'사륜오토바이(ATV)', y:a[8]});
  day.push({x:'불명', y:a[10]});
  day.push({x:'개인형이동수단(PM)', y:a[11]});
  day.push({x:'기타', y:a[12]});


  console.log(day);

  var svg = d3.select("svg");
  var width = parseInt(svg.style("width"),10) - 30;
  var height = parseInt(svg.style("height"), 10) - 20;
  var svgG = svg.append("g")
              .attr("transform", "translate(50,0)");

  var xScale = d3.scaleBand()// 척도라는데 무슨 말인지는 정확히 모르겠다.
                  .domain(day.map(function(d) {return d.x;}))
                  //도메인 값이 연속이면 시작,종료  값이 불연속이라 맵사용
                  .range([0, width]).padding(0.2);
                  //range의 화면 범위 지정을 위해 width값을 구해 지정함??

                  //domain은 데이터 값들의 정보(범위, 값)지정하는 것
                  //range는 출력되는 화면의 정보(범위, 픽셀)을 의미한다.
                  //척도는 데이터와 출력정보를 결합하여 계산한것으로
                  //데이터 개수와 범위로 잇을 위치가 계산됨.

  var yScale = d3.scaleLinear() // 연속 이라서 linear씀
                  .domain([0, d3.max(day, function(d){ return d.y+ 1000; })])
                  .range([height, 0]); // y 축은 아래에서부터 0으로 올라옴

  svgG.selectAll("rect")
    .data(day) //사용할 데이터 지정
    .enter() //데이터별로 실행
    .append("rect") //데이터별 사각형 생성
    .attr("class", "bar") //클래스 바로 지정
    .attr("height", function(d, i) { return height - yScale(d.y); }) //그려질애의 높이
    .attr("width", xScale.bandwidth()) //그려질애의 넓이 -> 들어올 데이터의 개수에따라 알아서 나눠짐
    .attr("x", function(d, i) { return xScale(d.x); }) //그려질애의 x좌표
    .attr("y", function(d, i) { return yScale(d.y); }); //그려질애의 y좌표;

  svgG.selectAll("text")
    .data(day)
    .enter().append("text") //데이터별 텍스트 생성
    .text(function(d) { return d.y})
    .attr("class", "text")
    .attr("text-anchor","middle")//지정된 좌표가 문자열의 중앙에 오게
    .attr("x", function(d, i) { return xScale(d.x)+xScale.bandwidth()/2; })// 중앙 계산하기 쉬워
    .attr("y", function(d, i) { return yScale(d.y) - 5 });

  svgG.append("g")
      .call(d3.axisLeft(yScale).ticks(5));


  svgG.append("g")
      .attr("transform", "translate(0," + (height) + ")")
      .call(d3.axisBottom(xScale));

  //척도를 이용한 축 생성
  //위치는 화면 height-20, 20을 뺸 이유는 x축 값 넣을려고
  //translate를 이용하여 축을 x축을 그//
});
