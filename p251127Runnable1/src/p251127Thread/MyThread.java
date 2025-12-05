package p251127Thread;

public class MyThread implements Runnable {
	String name;
	public MyThread(String name) {
		this.name = name;
	}

	@Override
	public void run() {
		for (int i = 0; i < 300; i++) {
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
