package p251127Thread;

public class Abb {

	public static void main(String[] args) {
		// 나만의 Thread 클래스로 객체를 생성한다.
		MyThread t1 = new MyThread("A");
		t1.start(); // 쓰레드 시작
		
		
		MyThread t2 = new MyThread("B");
		t2.start(); // 쓰레드 시작
		
		MyThread t3 = new MyThread("C");
		t3.start(); // 쓰레드 시작
	}

}
