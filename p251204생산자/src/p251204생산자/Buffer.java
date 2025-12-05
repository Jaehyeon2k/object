package p251204생산자;

public class Buffer {
	int mdata;
	boolean empty = true;
	
	synchronized int get() {
		while(empty) {
			// 소비자는 버퍼가 비어있으면 wait하라.
			try {
				wait();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		// 버퍼가 차있으니 이제 소비하자.
		// 소비를 할 것이니 상태 변수 empty는 비어 있는 상태로 변경
		empty = true;
		// 생산자가 wait하고 있을 경우 깨워주자
		notifyAll();
		return mdata;
	}
	
	synchronized void put(int data) {
		while(!empty) {
			// 생산자는 버퍼가 차 있으면 wait하라.
			try {
				wait();
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
		// 버퍼가 비어있으니 이제 생산하자.
		// 생산을 할것이니 상태변수 empty는 차 있는 상태로 변경
		empty = false;
		this.mdata = data;
		// 소비자가 wait하고 있을 경우 깨워주자.
		notifyAll();
	}
	
	
}
