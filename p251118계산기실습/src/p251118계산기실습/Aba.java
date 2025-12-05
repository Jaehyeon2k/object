package p251118계산기실습;

import java.awt.GridLayout;
import java.awt.Panel;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Aba extends JFrame{
	
	public Aba() {
		setTitle("실습");
		setSize(400, 400);
		
		JPanel panel = new JPanel();
		panel.setLayout(new GridLayout(2, 2));
		
		this.add(panel);
		
		JTextField text1 = new JTextField(10);
		JTextField text2 = new JTextField(10);
		
		panel.add(text1);
		panel.add(text2);
		
		JButton btn = new JButton("버튼");
		
		panel.add(btn);
		
		JLabel label = new JLabel("레이블");
		panel.add(label);
		
		
		setVisible(true);
	}
	
	
	public static void main(String[] args) {
		Aba obj = new Aba();

	}

}
