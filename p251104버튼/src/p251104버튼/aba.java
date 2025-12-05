package p251104버튼;

import java.awt.Color;
import java.awt.Dimension;
import java.awt.FlowLayout;
import java.awt.GridLayout;
import java.awt.Image;

import javax.swing.ImageIcon;
import javax.swing.JButton;
import javax.swing.JCheckBox;
import javax.swing.JFrame;
import javax.swing.JPanel;
import javax.swing.JTextField;

class MyNewFrame extends JFrame {
	// 버튼을 위한 필드 생성
	JButton button1;  // 텍스트
	JButton button2;  // 아이콘
	JButton button3;  // 텍스트, 아이콘
	
	// 생성자를 만든다
	public MyNewFrame() {
		// 크기, 타이틀 세팅
		setTitle("버튼 프레임");
		setSize(600,400);
		
		// 패널 객체를 생성하여 프레임에 추가한다.
		JPanel panel = new JPanel();
		
		panel.setLayout(new FlowLayout());
//		panel.setLayout(new GridLayout());
		// 패널의 바탕색
		Color color = new Color(255, 0, 0);
		panel.setBackground(color);
//		panel.setBackground(Color.red);
		this.add(panel);
		
		// 버튼 하나를 생성하여 패널에 추가한다.
		button1 = new JButton("사과");
		panel.add(button1);
		
		ImageIcon icon = new ImageIcon("C:\\Users\\YJU\\Downloads\\apple.png");
		Image image = icon.getImage();
		Image newImage = image.getScaledInstance(25, 25, java.awt.Image.SCALE_SMOOTH);
		icon = new ImageIcon(newImage);
		button2 = new JButton(icon);
		panel.add(button2);
		
		button3 = new JButton("사과", icon);
		button3.setPreferredSize(new Dimension(150, 100));
		panel.add(button3);
		
		// 텍스트필드 추가
		JTextField text1 = new JTextField(10);
		panel.add(text1);
				
		// 체크박스
		JCheckBox cb1 = new JCheckBox();
		JCheckBox cb2 = new JCheckBox("사과");
		JCheckBox cb3 = new JCheckBox("배", true);
		panel.add(cb1);
		panel.add(cb2);
		panel.add(cb3);
	
		// 프레임 보이게 함
		this.setVisible(true);
	}
}


public class aba {

	public static void main(String[] args) {
		MyNewFrame obj = new MyNewFrame();

	}

}
