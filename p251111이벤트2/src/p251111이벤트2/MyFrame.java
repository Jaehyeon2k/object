package p251111이벤트2;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JPanel;



public class MyFrame extends JFrame {
	public MyFrame() {
		setTitle("버튼 카운트 이벤트");
		setSize(400, 300);
		
		JPanel panel = new JPanel();
		this.add(panel);
		
		JButton btn = new JButton("카운트 버튼");
		panel.add(btn);
		
		btn.addActionListener(new MyListener());
		
		setVisible(true);
	}
}
