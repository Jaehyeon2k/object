package p251118실습;

import java.awt.GridLayout;
import java.awt.Panel;
import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;
import java.awt.event.KeyEvent;
import java.awt.event.KeyListener;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Aba extends JFrame implements KeyListener {
	public static char mode = '?';
	public Aba() {
		setTitle("실습");
		setSize(400, 200);

		JPanel panel = new JPanel();
		panel.setLayout(new GridLayout(2, 2));
		this.add(panel);

		JTextField text1 = new JTextField(10);
		JTextField text2 = new JTextField(10);
		text1.setText("10");
		text2.setText("10");
		panel.add(text1);
		panel.add(text2);

		JButton btn = new JButton("버튼");
		panel.add(btn);
		JLabel label = new JLabel("레이블");
		panel.add(label);

		// 버튼에 마우스를 클릭하면 실행되는 이벤트를 등록하자.
		// 액션리스너

		// 1. 액션리스너 객체를 만든다.
		Action listenerObject = new Action(label, text1, text2, panel);
		// 2. 버튼에 리스너를 등록한다.
		btn.addActionListener(listenerObject);
		
//		btn.addActionListener(new ActionListener() {
//
//			@Override
//			public void actionPerformed(ActionEvent e) {
//				int num1 = Integer.parseInt(text1.getText());
//				int num2 = Integer.parseInt(text2.getText());
//
//				int result = num1 + num2;
//				label.setText(String.valueOf(result));
//			}
//		});
		
		setVisible(true);
		// 패널에 키이벤트 추가
		// 프레임에 리스너 추가
		panel.addKeyListener(this);
		panel.requestFocus();

	}

	public static void main(String[] args) {
		Aba obj = new Aba();

	}

	@Override
	public void keyTyped(KeyEvent e) {
		// TODO Auto-generated method stub
			
	}

	@Override
	public void keyPressed(KeyEvent e) {
		// TODO Auto-generated method stub
		System.out.println(e.getKeyChar());
		setTitle(""+e.getKeyChar());
		mode = e.getKeyChar();
	}

	@Override
	public void keyReleased(KeyEvent e) {
		// TODO Auto-generated method stub
		
	}

}
