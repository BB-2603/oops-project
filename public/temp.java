import java.util.ArrayList;
import java.util.Collections;
import java.util.PriorityQueue;

class pair {
    int cnt;
    String str;

    public pair(String str, int cnt) {
        this.str = str;
        this.cnt = cnt;
    }

    public void incr() {
        this.cnt += 1;
    }
}

class temp {
    public static void main(String[] args) {
        String[] S = { "bc", "edf", "fde", "dge", "abcd" };
        int K = 4;
        ArrayList<pair> ans = new ArrayList<>();
        for (String i : S) {
            ArrayList<Character> arr = new ArrayList<>();
            int j = 0;
            for (; j < i.length(); j++) {
                if (!arr.contains(i.charAt(j))) {
                    arr.add(i.charAt(j));
                }
                if (arr.size() > K) {
                    break;
                }
            }
            if (j != i.length()) {
                continue;
            }
            Collections.sort(arr);
            String temp = "";
            for (int x = 0; x < arr.size(); x++) {
                temp += arr.get(x);
            }
            boolean chk = false;
            for (int x = 0; x < ans.size(); x++) {
                if (ans.get(x).str.indexOf(temp) > -1) {
                    ans.get(x).incr();
                    chk = true;
                    break;
                }
            }

            if (!chk) {
                pair p = new pair(temp, 1);
                ans.add(p);
            }
        }
        PriorityQueue<pair> pq = new PriorityQueue<>((a, b) -> a.str.length() - b.str.length());
        for (int i = 0; i < ans.size(); i++) {
            System.out.println(ans.get(i).str + " " + ans.get(i).cnt);
            pq.add(ans.get(i));
        }
        ans = new ArrayList<>();
        while (!pq.isEmpty()) {

            ans.add(pq.poll());
        }

        int finalcnt = 0;
        int cnt = 0;
        String x = "";
        for (int i = 0; i < ans.size(); i++) {
            finalcnt = Math.max(finalcnt, ans.get(i).cnt);
            String st = ans.get(i).str;
            if (x == "") {
                x = st;
                cnt += ans.get(i).cnt;
                System.out.println(finalcnt);
                finalcnt = Math.max(finalcnt, cnt);
                continue;
            }
            for (int j = 0; j < st.length(); j++) {
                if (x.indexOf(st.charAt(j)) > -1) {
                    continue;
                } else {
                    x += st.charAt(j);
                }
            }
            if (x.length() > K) {
                x = "";
                finalcnt = Math.max(finalcnt, cnt);
                cnt = 0;
                break;
            }
            if (x != "") {
                cnt += ans.get(i).cnt;
                finalcnt = Math.max(finalcnt, cnt);
            }
        }

        finalcnt = Math.max(finalcnt, cnt);
        System.out.println(finalcnt);

    }
}