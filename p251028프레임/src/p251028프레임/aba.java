package p251028프레임;

import java.awt.Color;
import java.awt.Image;

import javax.swing.*;

class MyFrame extends JFrame {
	public MyFrame (){
		setTitle("김재현 프레임 만들기");
		setSize(400, 200);
		setVisible(true);
		
		// 보조프레임 Panel을 Frame에 추가
		JPanel panel = new JPanel();
		// panel의 색상 설정
		panel.setBackground(Color.pink);
		this.add(panel);
		
		// 프레임에 이미지 줌
//		ImageIcon icon = new ImageIcon("C:\\Users\\YJU\\Downloads\\apple.png");
//		this.setIconImage(icon.getImage());
		this.setIconImage(new ImageIcon("C:\\Users\\YJU\\Downloads\\apple.png").getImage());
		setVisible(true);
	}
	
}

public class aba {

	public static void main(String[] args) {
		MyFrame obj = new MyFrame();

	}

}
