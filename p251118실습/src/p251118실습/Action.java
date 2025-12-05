package p251118실습;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

import javax.swing.JLabel;
import javax.swing.JPanel;
import javax.swing.JTextField;

public class Action implements ActionListener {
	JLabel mLabel;
	JTextField mNum1;
	JTextField mNum2;
	JPanel mPanel;

	public Action(JLabel label, JTextField text1, JTextField text2) {
		mLabel = label;
		mNum1 = text1;
		mNum2 = text2;
	}

	public Action(JLabel label, JTextField text1, JTextField text2, JPanel panel) {
		// TODO Auto-generated constructor stub
		mLabel = label;
		mNum1 = text1;
		mNum2 = text2;
		mPanel = panel;
	}

	@Override
	public void actionPerformed(ActionEvent e) {
		System.out.println("버튼이 눌러짐");
		String num1 = mNum1.getText();
		String num2 = mNum2.getText();
		System.out.println(num1);
		System.out.println(num1);
		int n1 = Integer.parseInt(num1);
		int n2 = Integer.parseInt(num2);
		int result = 0;
		switch (Aba.mode) {
			case '+':
				result = n1 + n2;
				break;
			case '-' :
				result = n1 - n2;
				break;
			case '*' :
				result = n1 * n2;
				break;
			case '/' :
				result = n1 / n2;
				break;
		}
		//result = n1 + n2;
		
		System.out.println(result);
		mLabel.setText(""+result);
		mPanel.requestFocus();
//		mLabel.setText("20");
	}

}
