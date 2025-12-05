package p251127Thread;

public class Abb {

	public static void main(String[] args) {
		// 1. Runnable 임터페이스를 상속받은 클래스의 객체 A 생성
		MyThread obj1 = new MyThread("A");
		
		// 2. Thread 객체를 생성(매개변수로 A)
		Thread t1 = new Thread(obj1);
		Thread t2 = new Thread(new MyThread("B"));
		Thread t3 = new Thread(new MyThread("C"));
		
		// 3. Thread 실행 (start 메소드)
		t1.start();
		t2.start();
		t3.start();
		
//		// 나만의 Thread 클래스로 객체를 생성한다.
//		MyThread t1 = new MyThread("A");
//		t1.start(); // 쓰레드 시작
//		
//		MyThread t2 = new MyThread("B");
//		t2.start(); // 쓰레드 시작
//		
//		MyThread t3 = new MyThread("C");
//		t3.start(); // 쓰레드 시작
	}

}
