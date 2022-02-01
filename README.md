## 구현방법

2가지 방법을 사용하여 구현을 해보았습니다.

### 차이점

**Draggable1** 는 useRef 를 통해, 실제 DOM을 컨트롤 하는 방식이고,

**Draggable2** 는 State를 통해, 컴포넌트의 스타일을 주입하여 변경하는 방식입니다.

### 공통점

App 컴포넌트에서 Draggable 컴포넌트와 box 컴포넌트를 생성하여 렌더링합니다.

Draggable 컴포넌트에서 children으로 box컴포넌트를 받아서 컨트롤 할 수 있도록 디자인 하였습니다.

리액트 엘리먼트 요소의 생성 시점으로 보면, Draggable 컴포넌트와 box 컴포넌트는 형제 관계입니다.

따라서 Draggable 컴포넌트에서, 상위(App컴포넌트)에서 받은 box 컴포넌트를 컨트롤 하기위해서 (props.children 은 ReadOnly 이므로, 확장하여 사용하기 위해서)

 props.children으로 받은 리액트 엘리먼트를 Clone하여 렌더링 하였습니다.

따라서 Draggable 컴포넌트에서 불필요한 Wrapper 요소를 붙이지않고, props.children으로 받은 요소만 확장하여 사용할 수 있다는 장점이 있는 것 같습니다.

### Draggable1 특징
  해당 요소를 클릭할 시, 전역으로 mouseUp, mouseMove 이벤트 리스너를 등록하고, 

  마우스를 뗐을때 mouseUp, mouseMove 이벤트를 해제합니다.

  타겟 DOM요소를 ref를 통해 참조하고, 이벤트를 전역에 선언함으로써, 마우스 드래깅시 타겟에서 마우스가 벗어나도, 지속적으로 타겟에 포커싱 할 수 있습니다.
  
  따라서 Draggable2 보다 조금 더 편한 드래깅이 가능합니다.
  
  
### 비고
Draggable2 는 주석처리 해놓았습니다.
