package p251127Thread2;

import java.awt.Font;

import javax.swing.JFrame;
import javax.swing.JLabel;

public class CountDownTest extends JFrame {
	JLabel label;

	// Thread 를 동작시키기 위한 MyThread 클래스를 내부 클래스로
	// 생성한다. (label 객체의 텍스트를 변경하기 위해서)

//	class MyThread extends Thread {
//		@Override
//		public void run() {
//			int total = 100;
//			for (int i = 0; i < total; i++) {
//				label.setText((total - i) + "");
//				try {
//					Thread.sleep(1000);
//				} catch (InterruptedException e) { // TODO Auto-generated catch block
//					e.printStackTrace();
//				}
//			}
//		}
//
//	}

	CountDownTest() {
		setTitle("카운트 다운");
		setSize(300, 200);
		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
		label = new JLabel("Start");
		// 라벨의 글자 크기와 폰트 등 수정
		Font font = new Font("Serif", Font.ITALIC, 100);
		label.setFont(font);

		// 프레임에 라벨을 추가
		add(label);

		setVisible(true);

		// 단일 스레드로 카운트 다운 하는 법
		MyThread obj = new MyThread(label);
		Thread t = new Thread(obj);
		t.start();
	}

	
}
