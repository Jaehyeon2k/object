package p251127Thread;

public class MyThread extends Thread {
	String name;
	public MyThread(String name) {
		this.name = name;
	}

	@Override
	public void run() {
		for (int i = 0; i < 1000; i++) {
			System.out.println(name+i);
			try {
				Thread.sleep(10);
			} catch (InterruptedException e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
