package p251111이벤트2;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;

public class MyFrame2 extends JFrame implements ActionListener {
	public MyFrame2() {
		setTitle("버튼 카운트 이벤트");
		setSize(400, 300);
		
		JPanel panel = new JPanel();
		this.add(panel);
		
		JButton btn = new JButton("카운트 버튼");
		panel.add(btn);
		// ANONYMOUS CLASS로 처리하기 ( 무명클래스 )
		btn.addActionListener(
				new ActionListener() {
					 int count = 0;
					@Override
					public void actionPerformed(ActionEvent e) {
						// TODO Auto-generated method stub
						count++;
						System.out.println(count + "번 눌렀어요!!");
					}
				}
				
				);
		
		setVisible(true);
	
	}

//	static int count = 0;

	@Override
	public void actionPerformed(ActionEvent e) {
//		count++;
//		System.out.println(count + "번 눌렀어요!!");
	}
}
