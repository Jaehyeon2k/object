package p251106계산기;

import java.awt.Color;
import java.awt.Font;
import java.awt.GridLayout;
import java.awt.Label;

import javax.swing.JButton;
import javax.swing.JFrame;
import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Calculator2 extends JFrame {

	// 생성자
	public Calculator2(String title1) {
		setTitle(title1);
		setSize(600,400);
		
		// 3개의 패널을 생성한다. 상, 중, 하
		JPanel topPanel = new JPanel(); // 상
		topPanel.setBounds(0, 0, 600, 60);
		//topPanel.setBackground(new Color(255, 0, 0));
		
		JPanel middlePanel1 = new JPanel(); // 중
		middlePanel1.setBounds(0, 60, 600, 60);
		middlePanel1.setBackground(new Color(255, 255, 0));
		JPanel middlePanel2 = new JPanel();
		middlePanel2.setBounds(150, 120, 300, 120);
		middlePanel2.setBackground(new Color(0, 255, 0));
		
		JPanel bottomPanel = new JPanel(); //하
		bottomPanel.setBounds(0, 240, 600, 90);
		bottomPanel.setBackground(new Color(255, 0, 0));
		
		// topPanel에 계산기 레이블 추가
		JLabel title = new JLabel("계산기", JLabel.CENTER);
		// 폰트
		Font font1 = new Font("명조체", Font.BOLD, 30);
		title.setFont(font1);
		// 색깔
		title.setForeground(Color.red);
		
		topPanel.add(title);
		
		
		// middlePanel에 텍스트필드 2개 추가
		JTextField input1 = new JTextField(10);
		JTextField input2 = new JTextField(10);
		middlePanel1.add(input1);
		middlePanel1.add(input2);
		
		JButton plusButton = new JButton("+");
		JButton minusButton = new JButton("-");
		JButton multiplyButton = new JButton("*");
		JButton divideButton = new JButton("/");
		middlePanel2.add(plusButton);
		middlePanel2.add(minusButton);
		middlePanel2.add(multiplyButton);
		middlePanel2.add(divideButton);
		middlePanel2.setLayout(new GridLayout(2, 1));
		// bottom에 "계산결과" 레이블, 결과숫자가 들어갈 빈 레이블 추가
		JLabel label1 = new JLabel("계산결과:", JLabel.CENTER);
		JLabel result = new JLabel("");
		// 폰트 변경
		Font font2 = new Font("명조체", Font.PLAIN, 30);
		label1.setFont(font2);
		// 색상 변경
		label1.setForeground(Color.WHITE);
		
		bottomPanel.add(label1);
		bottomPanel.add(result);
		
//		setLayout(new GridLayout(3, 1));
		//프레임에 panel 추가
		this.add(topPanel);
		this.add(middlePanel1);
		this.add(middlePanel2);
		this.add(bottomPanel);

//		setDefaultCloseOperation(JFrame.EXIT_ON_CLOSE);
//		setLayout(null);
		setVisible(true);
	}


}
