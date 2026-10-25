export const chapters=['Tất cả chủ đề','Quy định & quy tắc giao thông','Văn hóa, đạo đức & cứu hộ','Kỹ thuật lái xe','Cấu tạo & sửa chữa','Báo hiệu đường bộ','Sa hình & xử lý tình huống'];
export const groups=[
 {id:'all',name:'Tất cả biển báo',short:'Tất cả',color:'#16766b',description:'Nhận diện biển qua hình dáng, màu sắc, ký hiệu và biển phụ đi kèm.'},
 {id:'prohibit',name:'Biển báo cấm',short:'Biển cấm',color:'#e15959',shape:'Tròn · viền đỏ',description:'Phần lớn có hình tròn, viền đỏ, nền trắng và hình vẽ đen. Báo điều cấm hoặc hạn chế. Ngoại lệ: biển cấm đi ngược chiều có nền đỏ, vạch trắng; cấm dừng, đỗ có nền xanh.'},
 {id:'warning',name:'Biển nguy hiểm & cảnh báo',short:'Nguy hiểm',color:'#d8a52e',shape:'Tam giác · nền vàng',description:'Phần lớn là tam giác đều, viền đỏ, nền vàng, hình đen. Cảnh báo nguy hiểm phía trước để giảm tốc và chủ động phòng tránh. Biển giao nhau với đường ưu tiên có đỉnh quay xuống.'},
 {id:'mandatory',name:'Biển hiệu lệnh',short:'Hiệu lệnh',color:'#438bd5',shape:'Tròn · nền xanh',description:'Thường có hình tròn, nền xanh lam, hình trắng. Chỉ dẫn hành vi bắt buộc. Không nhầm mũi tên trong biển tròn với biển đường một chiều dạng vuông hoặc chữ nhật.'},
 {id:'guide',name:'Biển chỉ dẫn',short:'Chỉ dẫn',color:'#6381b9',shape:'Vuông / chữ nhật',description:'Thường là hình vuông hoặc chữ nhật, nền xanh. Cung cấp thông tin về hướng đi, vị trí và các tiện ích. Một số biển có màu nền, hình dạng khác theo quy chuẩn.'},
 {id:'supplement',name:'Biển phụ',short:'Biển phụ',color:'#777d86',shape:'Chữ nhật · nền trắng',description:'Thường có hình chữ nhật, nền trắng, chữ hoặc hình đen. Đặt cùng biển chính để làm rõ phạm vi, khoảng cách, hướng, thời gian hoặc đối tượng áp dụng.'}
];
const rows=[
 ['P.101','Đường cấm','prohibit','empty','Cấm các loại phương tiện đi lại cả hai hướng, trừ xe được ưu tiên theo quy định.','Khác P.102: đường cấm áp dụng cả hai hướng.'],
 ['P.102','Cấm đi ngược chiều','prohibit','entry','Cấm các loại xe đi vào theo chiều đặt biển, trừ các xe được ưu tiên theo quy định.','Nền đỏ, vạch trắng nằm ngang.'],
 ['P.103a','Cấm xe ô tô','prohibit','car','Cấm xe ô tô và các loại xe cơ giới có kết cấu tương tự theo quy chuẩn, trừ xe được ưu tiên.','Đọc đúng hình xe; không áp dụng máy móc cho mọi loại xe.'],
 ['P.104','Cấm xe mô tô','prohibit','moto','Cấm xe mô tô đi qua, trừ xe được ưu tiên theo quy định.','Phân biệt xe mô tô với xe gắn máy và hình xe đạp.'],
 ['P.106a','Cấm xe ô tô tải','prohibit','truck','Cấm các loại xe ô tô tải, trừ xe được ưu tiên theo quy định.','Nếu có số khối lượng trên hình xe, cần đọc điều kiện khối lượng chuyên chở.'],
 ['P.110a','Cấm xe đạp','prohibit','bike','Cấm xe đạp đi qua.','Xe đạp khác xe mô tô ở hình vẽ không có động cơ.'],
 ['P.112','Cấm người đi bộ','prohibit','person','Cấm người đi bộ qua khu vực có biển.','Phân biệt với biển đường dành cho người đi bộ nền xanh.'],
 ['P.115','Hạn chế trọng tải toàn bộ xe','prohibit','10t','Cấm xe có khối lượng toàn bộ, gồm xe và hàng, vượt trị số ghi trên biển.','Khác hạn chế tải trọng trục: xét tổng xe và hàng.'],
 ['P.117','Hạn chế chiều cao','prohibit','height','Cấm xe và hàng có chiều cao vượt trị số ghi trên biển.','Tính cả hàng hóa và vật nhô cao trên xe.'],
 ['P.118','Hạn chế chiều ngang','prohibit','width','Cấm xe và hàng có chiều ngang vượt trị số ghi trên biển.','Hai mũi tên hướng vào theo chiều ngang.'],
 ['P.123a','Cấm rẽ trái','prohibit','left','Cấm rẽ trái tại nơi đặt biển; không đồng nghĩa với cấm quay đầu xe.','Phân biệt với biển cấm rẽ trái và quay đầu.'],
 ['P.123b','Cấm rẽ phải','prohibit','right','Cấm rẽ phải theo hướng biển báo.','Nhìn chiều mũi tên và vạch chéo đỏ.'],
 ['P.124a','Cấm quay đầu xe','prohibit','uturn','Cấm các loại xe quay đầu theo hiệu lực của biển.','Cấm quay đầu không đồng nghĩa với cấm rẽ trái.'],
 ['P.125','Cấm vượt','prohibit','overtake','Cấm xe cơ giới vượt nhau, trừ trường hợp được quy chuẩn cho phép.','Không suy luận rằng mọi tình huống vượt mọi loại xe đều bị cấm.'],
 ['P.127','Tốc độ tối đa cho phép','prohibit','50','Cấm chạy với tốc độ vượt quá trị số ghi trên biển, trừ xe được ưu tiên theo quy định.','Viền đỏ là tối đa; tròn xanh là tối thiểu.'],
 ['P.130','Cấm dừng xe và đỗ xe','prohibit','nostop','Cấm dừng và đỗ xe ở phía đường có đặt biển trong phạm vi hiệu lực.','Hai vạch đỏ chéo; khác cấm đỗ chỉ có một vạch.'],
 ['P.131a','Cấm đỗ xe','prohibit','nopark','Cấm đỗ xe ở phía đường đặt biển trong phạm vi hiệu lực.','Một vạch chéo đỏ; phải phân biệt dừng xe với đỗ xe.'],
 ['W.201a','Chỗ ngoặt nguy hiểm bên trái','warning','curveleft','Cảnh báo phía trước có chỗ ngoặt nguy hiểm về bên trái. Giảm tốc và quan sát.','Chiều cong của hình vẽ chỉ hướng ngoặt.'],
 ['W.201b','Chỗ ngoặt nguy hiểm bên phải','warning','curveright','Cảnh báo phía trước có chỗ ngoặt nguy hiểm về bên phải.','Không vượt thiếu quan sát ở đường cong.'],
 ['W.203b','Đường bị thu hẹp bên trái','warning','narrowleft','Phía trước đường bị thu hẹp về phía bên trái. Chủ động giảm tốc, nhường đường khi cần.','Bên nào đường viền nghiêng vào là bên thu hẹp.'],
 ['W.203c','Đường bị thu hẹp bên phải','warning','narrowright','Phía trước đường bị thu hẹp về phía bên phải.','Phân biệt với thu hẹp cả hai bên.'],
 ['W.205a','Đường giao nhau','warning','cross','Cảnh báo sắp đến nơi giao nhau của các đường cùng cấp. Quan sát và nhường đường đúng quy tắc.','Biển cảnh báo không tự tạo quyền ưu tiên.'],
 ['W.208','Giao nhau với đường ưu tiên','warning','yield','Báo sắp giao với đường ưu tiên; xe trên đường có biển phải nhường xe trên đường ưu tiên.','Tam giác có đỉnh quay xuống.'],
 ['W.209','Giao nhau có tín hiệu đèn','warning','lights','Cảnh báo phía trước là nơi giao nhau có điều khiển bằng tín hiệu đèn.','Quan sát tín hiệu thực tế khi đến nút giao.'],
 ['W.219','Dốc xuống nguy hiểm','warning','slope','Cảnh báo đoạn xuống dốc nguy hiểm. Chọn số và tốc độ phù hợp, kiểm soát phanh.','Không về số N hoặc tắt máy khi xuống dốc.'],
 ['W.221b','Đường có gồ giảm tốc','warning','bump','Báo trước đoạn đường có gồ giảm tốc. Giảm tốc độ để đi qua an toàn.','Phân biệt hình gồ nổi với hình mặt đường không bằng phẳng.'],
 ['W.224','Đường người đi bộ cắt ngang','warning','person','Cảnh báo đoạn đường phía trước có người đi bộ qua đường.','Tam giác vàng cảnh báo trước, khác biển chỉ vị trí sang đường.'],
 ['W.225','Trẻ em','warning','children','Báo gần đoạn đường thường có trẻ em đi ngang hoặc tụ tập. Giảm tốc và đề phòng.','Chú ý khu vực trường học, nhà trẻ.'],
 ['W.233','Nguy hiểm khác','warning','!','Cảnh báo nguy hiểm không thể hiện bằng các biển nguy hiểm riêng; đọc biển phụ nếu có.','Không bỏ qua thông tin bổ sung dưới biển.'],
 ['W.245','Đi chậm','warning','slow','Nhắc người điều khiển phương tiện đi chậm để bảo đảm an toàn.','Đọc biển phụ và quan sát điều kiện đường.'],
 ['R.301a','Hướng đi phải theo: đi thẳng','mandatory','straight','Các xe chỉ được đi thẳng theo hiệu lực của biển.','Mũi tên trắng trên biển tròn xanh.'],
 ['R.301b','Hướng đi phải theo: rẽ phải','mandatory','right','Các xe chỉ được rẽ phải theo chỉ dẫn của biển.','Phân biệt vị trí biển trước nút giao với sau nút giao.'],
 ['R.301c','Hướng đi phải theo: rẽ trái','mandatory','left','Các xe phải rẽ trái theo chỉ dẫn của biển.','Biển tròn xanh là hiệu lệnh bắt buộc.'],
 ['R.301i','Hướng đi phải theo: trái hoặc phải','mandatory','both','Các xe chỉ được rẽ trái hoặc rẽ phải theo biển; không đi thẳng.','Đọc từng nhánh mũi tên.'],
 ['R.302a','Hướng phải đi vòng chướng ngại vật','mandatory','diagonal','Xe phải đi vòng chướng ngại vật về phía bên phải theo hướng mũi tên.','Mũi tên chếch khác mũi tên rẽ tại giao lộ.'],
 ['R.303','Nơi giao nhau chạy theo vòng xuyến','mandatory','roundabout','Các xe phải chạy vòng theo chiều mũi tên trong đảo giao thông.','Nhường đường theo quy tắc áp dụng tại vòng xuyến.'],
 ['R.305','Đường dành cho người đi bộ','mandatory','person','Đường dành cho người đi bộ; phương tiện không được đi vào trừ trường hợp được phép theo quy định.','Tròn xanh khác tam giác vàng cảnh báo người đi bộ.'],
 ['R.306','Tốc độ tối thiểu cho phép','mandatory','30','Trong điều kiện thuận lợi, xe phải chạy ít nhất bằng tốc độ ghi trên biển.','Không áp dụng cách nhớ này cho biển nền trắng viền đỏ.'],
 ['I.407a','Đường một chiều','guide','straight','Báo đường chỉ cho phép xe chạy theo chiều mũi tên.','Nền xanh, dạng chữ nhật; khác biển tròn chỉ được đi thẳng.'],
 ['I.408','Nơi đỗ xe','guide','P','Chỉ dẫn vị trí hoặc khu vực được đỗ xe; đọc biển phụ về phạm vi, loại xe.','Chữ P trắng; vẫn phải tuân thủ điều kiện đỗ xe.'],
 ['I.423a','Vị trí người đi bộ sang ngang','guide','crosswalk','Chỉ vị trí dành cho người đi bộ sang ngang đường. Quan sát, giảm tốc và nhường đường theo quy định.','Khác W.224 cảnh báo trước đoạn người đi bộ cắt ngang.'],
 ['I.425','Bệnh viện','guide','hospital','Chỉ dẫn vị trí cơ sở bệnh viện gần đường.','Chữ thập đỏ trong ô trắng trên nền xanh.'],
 ['I.434a','Bến xe buýt','guide','bus','Chỉ dẫn vị trí dừng đón trả khách của xe buýt.','Phương tiện khác cần tránh cản trở xe buýt.'],
 ['S.501','Phạm vi tác dụng của biển','supplement','range','Cho biết chiều dài đoạn đường chịu tác dụng của biển chính.','Phân biệt phạm vi tác dụng với khoảng cách tới đối tượng.'],
 ['S.502','Khoảng cách đến đối tượng báo hiệu','supplement','distance','Ghi khoảng cách từ vị trí đặt biển đến đối tượng được báo hiệu phía trước.','Không nhầm là chiều dài đoạn bị hạn chế.'],
 ['S.508a','Biểu thị thời gian','supplement','time','Quy định khoảng thời gian mà biển chính có hiệu lực.','Ngoài khung giờ vẫn cần tuân thủ các quy định khác.']
];
export const signs=rows.map(([code,name,group,symbol,meaning,note])=>({code,name,group,symbol,meaning,note}));
export const tips=[
 ['01','Nhận biển bằng 3 bước','Biển báo','Hình dáng → màu sắc → ký hiệu','Nhìn hình trước: tròn viền đỏ thường là cấm, tam giác vàng thường là cảnh báo, tròn xanh thường là hiệu lệnh. Sau đó đọc hình xe, hướng mũi tên và biển phụ. Luôn ghi nhớ ngoại lệ P.102, P.130 và W.208.'],
 ['02','Tối đa đỏ, tối thiểu xanh','Biển báo','Cùng là con số, ý nghĩa khác nhau','Biển tròn viền đỏ ghi tốc độ là giới hạn tối đa; biển tròn xanh ghi tốc độ là mức tối thiểu trong điều kiện thuận lợi. Chọn đáp án theo biển trong câu hỏi, không chỉ nhìn con số.'],
 ['03','Một gạch cấm đỗ, hai gạch cấm dừng','Biển báo','So sánh P.131a và P.130','Cấm đỗ có một gạch chéo đỏ. Cấm dừng và đỗ có hai gạch chéo đỏ. Nhớ đọc biển phụ về hướng, thời gian và phạm vi hiệu lực.'],
 ['04','Không suy diễn từ cấm rẽ trái','Biển báo','Rẽ trái và quay đầu là hai hành vi','P.123a cấm rẽ trái không đồng nghĩa với cấm quay đầu. P.124a cấm quay đầu không đồng nghĩa với cấm rẽ trái. Nếu biển kết hợp cả hai hình thì đọc đủ cả hai.'],
 ['05','Hiệu lệnh người điều khiển trước','Quy tắc','Người điều khiển → đèn → biển → vạch','Khi báo hiệu có nội dung khác nhau, chấp hành theo thứ tự hiệu lực. Nếu có biển tạm thời và biển cố định khác nhau thì chấp hành biển tạm thời theo quy định.'],
 ['06','Đọc sa hình theo thứ tự','Sa hình','Tín hiệu → ưu tiên → hướng đi','Xác định người điều khiển hoặc đèn, biển ưu tiên, xe ưu tiên đang làm nhiệm vụ và vị trí các xe. Tại giao nhau không vòng xuyến, không có báo hiệu ưu tiên, nhường xe từ bên phải. Có vòng xuyến, nhường xe bên trái. Đừng dùng một khẩu quyết cho mọi hình.'],
 ['07','Xuống dốc phải kiểm soát tốc độ','Kỹ thuật','Chọn số phù hợp, kết hợp phanh','Không tắt máy, không về số N khi xuống dốc. Sử dụng số phù hợp để tận dụng phanh động cơ; không rà phanh liên tục gây nóng phanh. Với từng loại hộp số, làm theo hướng dẫn vận hành.'],
 ['08','Ưu tiên học 60 câu điểm liệt','Điểm liệt','Hiểu tình huống, không đoán từ khóa','Luyện nhóm điểm liệt riêng: hành vi bị cấm, rượu bia, ma túy, đua xe, vượt ẩu và các tình huống mất an toàn nghiêm trọng. Thi thử sai hoặc bỏ trống câu điểm liệt đều không đạt theo chế độ đang áp dụng.'],
 ['09','Không có mẹo “luôn chọn đáp án dài”','Cách học','Loại trừ bằng kiến thức','Không tự động chọn “cả hai ý”, “tất cả” hoặc phương án dài nhất. Đọc từng mệnh đề: chỉ một chi tiết sai cũng làm phương án không đúng. Đáp án có thể thay đổi vị trí.'],
 ['10','Ôn câu sai sau một khoảng nghỉ','Cách học','Làm → xem lại → giải thích → làm lại','Sau mỗi đề, xem các câu sai và chưa trả lời. Tự giải thích lý do trước khi chọn lại; hôm sau làm lại nhóm câu đó. Dùng mục Câu cần ôn để theo dõi tiến bộ.'],
 ['11','Phân biệt dừng và đỗ','Quy tắc','Tạm thời cần thiết và không giới hạn thời gian','Dừng xe là đứng yên tạm thời trong khoảng thời gian cần thiết cho người lên xuống, xếp dỡ hoặc việc khác. Đỗ xe là đứng yên không giới hạn thời gian. Đừng chỉ dựa vào việc có tắt máy hay chưa.'],
 ['12','Chừa thời gian rà soát','Phòng thi','Câu chắc trước, câu khó sau','Trong chế độ thi, đánh dấu câu cần xem lại và quay lại bằng bảng số câu. Kiểm tra các câu còn trống, câu có từ “không”, “bị cấm”, “được phép”. Đồng hồ vẫn chạy khi chuyển câu.']
];
export function signSVG(sign){
 const {group:g,symbol:s}=sign;const color=g==='mandatory'||g==='guide'?'white':'#20252b';
 let base=g==='prohibit'?`<circle cx="60" cy="60" r="47" fill="${s==='entry'?'#dc393c':['nostop','nopark'].includes(s)?'#1768b6':'white'}" stroke="#dc393c" stroke-width="9"/>`:g==='warning'?`<path d="${s==='yield'?'M9 15H111L60 106Z':'M60 9L114 105H6Z'}" fill="${s==='yield'?'white':'#ffda51'}" stroke="#dc393c" stroke-width="7" stroke-linejoin="round"/>`:g==='mandatory'?'<circle cx="60" cy="60" r="49" fill="#1768b6"/>':g==='guide'?'<rect x="12" y="8" width="96" height="104" rx="4" fill="#1768b6"/>':'<rect x="5" y="31" width="110" height="58" rx="2" fill="white" stroke="#242c34" stroke-width="3"/>';
 const paths={straight:'M60 91V31M41 49L60 30 79 49',left:'M82 87V59H33M51 39L31 59 51 79',right:'M38 87V59H87M69 39L89 59 69 79',uturn:'M82 89V46C82 20 38 20 38 46V82M22 66L38 84 54 66',diagonal:'M35 86L85 36M57 36H85V64',both:'M60 91V51M28 51H92M43 36L27 51 43 66M77 36L93 51 77 66',curveleft:'M77 91V69Q77 51 47 50V34M34 46L47 32 60 46',curveright:'M43 91V69Q43 51 73 50V34M60 46L73 32 86 46',cross:'M60 35V94M34 64H86',narrowleft:'M80 92V35M42 92V70L55 49V35',narrowright:'M40 92V35M78 92V70L65 49V35'};
 let shape='';
 if(paths[s])shape=`<path d="${paths[s]}" fill="none" stroke="${color}" stroke-width="8" stroke-linejoin="round"/>`;
 else if(s==='empty'||s==='yield')shape='';
 else if(s==='entry')shape='<path d="M28 60H92" stroke="white" stroke-width="16"/>';
 else if(s==='nostop'||s==='nopark')shape=`<path d="M27 27L93 93${s==='nostop'?'M93 27L27 93':''}" stroke="#dc393c" stroke-width="8"/>`;
 else if(s==='car'||s==='overtake')shape=`<g fill="${s==='overtake'?'#dd3538':color}"><path d="M32 53L39 37H81L88 53V82H80V75H40V82H32ZM41 52H79L74 42H46Z"/><rect x="27" y="55" width="66" height="17" rx="5"/></g>`;
 else if(s==='truck'||s==='bus')shape=`<path d="M25 46H70V75H25ZM70 55H83L96 67V80H70Z" fill="${color}"/><circle cx="40" cy="81" r="9" fill="${color}"/><circle cx="81" cy="81" r="9" fill="${color}"/>`;
 else if(s==='person'||s==='children'||s==='crosswalk')shape=`${s==='crosswalk'?'<path d="M60 20L102 90H18Z" fill="white"/>':''}<g stroke="${s==='crosswalk'?'#222':color}" stroke-width="7" fill="none" stroke-linecap="round"><circle cx="62" cy="38" r="5" fill="${s==='crosswalk'?'#222':color}"/><path d="M62 49L55 67 43 87M55 67L74 87M60 54L78 65M60 52L42 61"/></g>`;
 else if(s==='bike'||s==='moto')shape=`<g fill="none" stroke="${color}" stroke-width="5"><circle cx="34" cy="78" r="14"/><circle cx="88" cy="78" r="14"/><path d="M34 78L48 49 68 78H34M68 78L78 43H88M42 48H58"/></g>`;
 else if(s==='height'||s==='width')shape=`<text x="60" y="70" text-anchor="middle" font-size="27" font-weight="700">${s==='height'?'3,5m':'2,5m'}</text><path d="${s==='height'?'M55 31L60 23 65 31M55 89L60 97 65 89':'M24 55L17 60 24 65M96 55L103 60 96 65'}" fill="#20252b"/>`;
 else if(s==='lights')shape='<rect x="48" y="36" width="24" height="57" rx="4" fill="#222"/><circle cx="60" cy="47" r="6" fill="#eb3b38"/><circle cx="60" cy="64" r="6" fill="#f6d74d"/><circle cx="60" cy="81" r="6" fill="#42a565"/>';
 else if(s==='bump')shape='<path d="M26 89H43Q60 52 77 89H94" fill="none" stroke="#222" stroke-width="7"/>';
 else if(s==='slope')shape='<path d="M26 62L95 94H26Z" fill="#222"/><text x="68" y="64" text-anchor="middle" font-size="20" transform="rotate(20 68 64)">10%</text>';
 else if(s==='hospital')shape='<rect x="29" y="27" width="62" height="65" fill="white"/><path d="M60 38V80M39 59H81" stroke="#de3c40" stroke-width="13"/>';
 else if(s==='roundabout')shape='<g fill="none" stroke="white" stroke-width="7"><path d="M43 34Q74 18 87 53M71 48L89 56 96 38M89 69Q72 100 43 87M47 71L40 89 56 99M30 78Q16 51 36 34M20 35L38 31 43 48"/></g>';
 else if(['range','distance','time'].includes(s))shape=`<text x="60" y="68" text-anchor="middle" fill="#222" font-size="${s==='time'?18:23}" font-weight="600">${s==='range'?'↑ 500m ↑':s==='distance'?'200 m':'6:00 – 9:00'}</text>`;
 else shape=`<text x="60" y="${s==='slow'?78:78}" text-anchor="middle" fill="${color}" font-size="${s==='slow'?17:48}" font-weight="700">${s==='slow'?'ĐI CHẬM':s}</text>`;
 if(g==='prohibit'&&!['empty','entry','50','10t','height','width','nostop','nopark'].includes(s))shape+='<path d="M27 27L93 93" stroke="#dc393c" stroke-width="7"/>';
 return `<svg viewBox="0 0 120 120" role="img" aria-label="${sign.name}" xmlns="http://www.w3.org/2000/svg">${base}${shape}</svg>`;
}
