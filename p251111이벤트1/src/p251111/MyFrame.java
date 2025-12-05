package p251111;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

// 이벤트 리스너 객체를 생성하기 위한
// 이벤트 객체에 연관되는 이벤트 리스너 인터페이스 상속 받아 이벤트 리스너 클래스 정의
class MyListener implements ActionListener {

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println("버튼을 눌렀어요!!");
	}
}

public class MyFrame extends JFrame {
	public MyFrame () {
		// 프레임 타이틀을 본인의 이름으로 설정한다.
		this.setTitle("이벤트 핸들러");
		// 프레임의 크기를 설정한다.
		this.setSize(400, 200);
		// 패널 객체를 생성한다.
		JPanel panel = new JPanel();
		// 패널을 프레임에 추가한다.
		this.add(panel);
		// 버튼을 생성하고, 버튼을 패널에 추가한다.
		JButton Btn1 = new JButton("버튼");
		panel.add(Btn1);
		
		// 버튼에 이벤트를 등록하자.
		MyListener myListener = new MyListener();
		// 버튼에 액션이벤트(버튼이 클릭)가 발생했을 때
		// 이벤트 처리하는 객체(myListener)의 actionPerformed 메소드를 실행 시킨다.
		Btn1.addActionListener(myListener);
		
		setVisible(true);
	}
}
