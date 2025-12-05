package p251204생산자;

public class Abb {

	public static void main(String[] args) {
		Buffer buffer = new Buffer();
		Producer p = new Producer(buffer);
		Consumer c = new Consumer(buffer);
		p.start();
		try {
			Thread.sleep(100);
		} catch (InterruptedException e) {
			// TODO Auto-generated catch block
			e.printStackTrace();
		}
		c.start();
	}

}
