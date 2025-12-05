package p251021Interface;

// 홈네트워크의 공통 메서드를 위한 인터페이스 생성
interface RemoteControl {
	void turnOn();
	void turnOff();
}

interface SoundControl {
	void soundUp();
	void soundDown();
}

class Mp3 implements RemoteControl, SoundControl {

	@Override
	public void turnOn() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void turnOff() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void soundUp() {
		// TODO Auto-generated method stub
		
	}

	@Override
	public void soundDown() {
		// TODO Auto-generated method stub
		
	}
	
}
// 추상클래스
abstract class Re{
	public abstract void turnOn();
}

class Tv implements RemoteControl {
	@Override
	public void turnOn() {
		
	}
	@Override
	public void turnOff() {
		
	}
}

class Refri implements RemoteControl {
	@Override
	public void turnOn() {
		
	}
	@Override
	public void turnOff() {
		
	}
}
class Tv1 extends Re{
	// 부모 추상클래스에 있는 추상메소드를 반드시 implement 해야 한다.
	@Override
	public void turnOn() {

		
	}
	
}

public class Abb {

	public static void main(String[] args) {
		// TV와 냉장고 객체를 각각 만든다.
		Tv obj1 = new Tv();
		Refri obj2 = new Refri();
		
		obj1.turnOn();
		obj2.turnOn();
		
		RemoteControl[] arrayHomeNetwork = new RemoteControl[3];
		
		arrayHomeNetwork[0] = obj1;	
		arrayHomeNetwork[1] = obj2;
		
		for(RemoteControl i : arrayHomeNetwork) {
			i.turnOn();
		}
		obj1 = (Tv)arrayHomeNetwork[0];
		RemoteControl t2 = new Tv();
	}

}
