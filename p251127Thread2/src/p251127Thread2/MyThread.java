package p251127Thread2;

import javax.swing.JLabel;

public class MyThread extends Thread {
	JLabel label;
	public MyThread(JLabel label) {
		this.label = label;
	}

	@Override
	public void run() {
		int total = 100;
		for (int i = 0; i < total; i++) {
			label.setText((total - i) + "");
			try {
				Thread.sleep(1000);
			} catch (Exception e) {
				// TODO Auto-generated catch block
				e.printStackTrace();
			}
		}
	}

}
