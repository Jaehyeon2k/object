package p251111이벤트2;

import java.awt.event.ActionEvent;
import java.awt.event.ActionListener;

class MyListener implements ActionListener {
	public static int count = 0;
	@Override
	public void actionPerformed(ActionEvent e) {
		count++;
		System.out.println(count + "번 눌렀어요!!!!");
	}
}