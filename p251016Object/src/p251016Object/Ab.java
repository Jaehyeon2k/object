package p251016Object;

class Car {
	static int numberOfCars = 0;
	
	public Car() {
		++numberOfCars;
		System.out.println("객체수" + numberOfCars);
	}
	// 객체 소멸 시 객체수를 줄이기 위해 finalize 메소드를 overriding

	@Override
	protected void finalize() throws Throwable {
		--numberOfCars;
		System.out.println("객체수" + numberOfCars);
		
	}
	
}
public class Ab {
	public static void main(String[] args) {
		
		Car c = new Car();
		Car[] cars = new Car[100];
		for(int i = 0; i < 10; i++) {
			cars[i] = new Car();
		}
		System.out.println("객체를 11개 만들고 5초간 쉰다.");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		for(int i = 0; i < 10; i++) {
			cars[i] = null;
		}
		System.gc(); //가비지 컬렉터 강제 호출
		System.out.println("객체 참조를 없애고 5초간 쉰다. \n시작");
		try {
			Thread.sleep(5000);
		} catch (InterruptedException e) {
			e.printStackTrace();
		}
		System.out.println("객체 참조를 없애고 5초간 쉰다. 끝");

		for(int i = 0; i < 10; i++) {
			cars[i] = new Car();
		}
	}
}
