const img=k=>(window.IMG&&window.IMG[k])||'images/'+k+'.jpg';
const $=s=>document.querySelector(s),fmt=n=>'Dhs. '+n.toFixed(2),WA='971550000000';
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const CATN={n:'Necklace',r:'Rings',b:'Bracelet'};
const DESC={n:'A delicate statement piece crafted in premium stainless steel with 18K gold PVD plating. Lightweight, hypoallergenic and designed to be worn every day — it keeps its shine through water, sweat and daily wear.',
r:'A beautifully finished ring with a flawless 18K gold-tone plating. Comfortable to wear all day, water-resistant and tarnish-free — perfect for gifting or for completing your everyday look.',
b:'An elegant bracelet made from stainless steel with a rich 18K gold finish. Skin-friendly, waterproof and made to stay bright — a perfect companion for any outfit or occasion.'};
const raw={
n:[['"Hearts" Necklace – 18K Gold Silver',69],['"Bird" Necklace – 18K Golden Pendant',79],['"Charm & Beautiful" Necklace – 18K Locket Silver',85],['"Rainier" Necklace – 18K Golden Chain',75],['"Heart" Necklace – 18K Golden Love',89]],
r:[['Golden Edged Ring – 18K Gold Keystone',59],['Domed Ring – 18K Gold Elegance',69],['Triple Colour Ring – 18K Gold',79],['Black Diamond Square Ring – 18K Gold',85],['Halo Diamond Ring – Silver Sparkle',79,85]],
b:[['Starfished Bracelet – 18K Gold Elegance',89],['Crescent Bracelet – 18K Gold Elegance',69],['Layered Bracelet – 18K Gold Elegance',99],['Charming Butterfly Bracelet – 18K Emerald Gold',85],['Classic Round Bracelet – 18K Gold',79]]};
const CAT={};Object.keys(raw).forEach(k=>raw[k].forEach((p,i)=>CAT[k+i]={id:k+i,k,name:p[0],price:p[1],old:p[2]||0}));
/* ---------- home rendering ---------- */
document.querySelectorAll('.row').forEach(r=>{const k=r.dataset.p;r.innerHTML=raw[k].map((_,i)=>{const p=CAT[k+i];return `<a class="p" href="#/product/${p.id}">${p.old?'<span class="sale">-8%</span>':''}<div class="im"><img src="${img(p.id)}" alt="${esc(p.name)}" loading="lazy"></div><b>${esc(p.name)}</b><span class="rt">★★★★★</span><span class="pr">${p.old?'<s>'+fmt(p.old)+'</s> ':''}${fmt(p.price)}</span></a>`}).join('')});
$('#cats').innerHTML=[['NECKLACE','c_necklace','#necklace'],['BRACELET','c_bracelet','#bracelet'],['ANKLET','c_anklet','#anklet'],['EARRINGS','c_earrings','#earrings'],['SETS','c_sets','#sets'],['RINGS','c_rings','#rings']].map(c=>`<a class="cat" href="${c[2]}"><img src="${img(c[1])}" alt=""><b>${c[0]}</b></a>`).join('');
$('#all').innerHTML=[['RINGS','g_rings','#rings'],['NECKLACE','g_necklace','#necklace'],['EARRINGS','g_earrings','#earrings'],['ANKLET','g_anklet','#bracelet']].map(c=>`<a class="g" href="${c[2]}"><img src="${img(c[1])}" alt=""><b>${c[0]}</b></a>`).join('');
$('.burger').onclick=()=>$('#nav').classList.toggle('open');
document.querySelectorAll('#nav a').forEach(a=>a.addEventListener('click',()=>$('#nav').classList.remove('open')));
const els=document.querySelectorAll('.sec,.reviews,.blog,.faqWrap,.promo,.trust,.two,.duo,.g4');els.forEach(e=>e.classList.add('rev'));
const io=new IntersectionObserver(es=>es.forEach(e=>e.isIntersecting&&(e.target.classList.add('show'),io.unobserve(e.target))),{threshold:.05});els.forEach(e=>io.observe(e));
document.querySelector('footer button').onclick=()=>{const i=document.querySelector('footer input');toast(i.value?'Thanks for subscribing!':'Please enter your email');i.value=''};
/* ---------- cart ---------- */
let cart=[];try{cart=JSON.parse(localStorage.getItem('cw_cart')||'[]').filter(i=>CAT[i.id])}catch(e){}
const save=()=>{try{localStorage.setItem('cw_cart',JSON.stringify(cart))}catch(e){}};
const count=()=>cart.reduce((a,i)=>a+i.qty,0),total=()=>cart.reduce((a,i)=>a+i.qty*CAT[i.id].price,0);
let tt;function toast(m){const t=$('#toast');t.textContent=m;t.classList.add('on');clearTimeout(tt);tt=setTimeout(()=>t.classList.remove('on'),2200)}
function addToCart(id,q=1){const it=cart.find(i=>i.id==id);it?it.qty+=q:cart.push({id,qty:q});save();renderCart();const b=$('#cartCount');b.classList.remove('bump');void b.offsetWidth;b.classList.add('bump')}
function setQty(id,d){const it=cart.find(i=>i.id==id);if(!it)return;it.qty+=d;if(it.qty<1)cart=cart.filter(i=>i.id!=id);save();renderCart()}
function renderCart(){$('#cartCount').textContent=count();$('#cartCount').style.display=count()?'grid':'none';
 $('#drawer').innerHTML=`<div class="dh"><h3>Your Cart (${count()})</h3><button data-act="close" aria-label="Close">✕</button></div>`+(cart.length?`<div class="dl">${cart.map(i=>{const p=CAT[i.id];return `<div class="ci"><img src="${img(p.id)}" alt=""><div><a href="#/product/${p.id}" data-act="close">${esc(p.name)}</a><span>${fmt(p.price)}</span><div class="qty sm"><button data-q="-1" data-id="${p.id}">−</button><b>${i.qty}</b><button data-q="1" data-id="${p.id}">+</button></div></div><button class="rm" data-rm="${p.id}" aria-label="Remove">🗑</button></div>`}).join('')}</div><div class="df"><div class="sub"><span>Subtotal</span><b>${fmt(total())}</b></div><small>Cash on Delivery available. Delivery charges confirmed on order.</small><button class="blk" data-act="checkout">CHECKOUT</button><button class="ghost" data-act="close">Continue Shopping</button></div>`:`<div class="empty"><div>🛍</div><p>Your cart is empty</p><button class="blk" data-act="close">Start Shopping</button></div>`)}
const openCart=()=>{$('#drawer').classList.add('open');$('#ov').classList.add('on')};
const closeAll=()=>{$('#drawer').classList.remove('open');$('#ov').classList.remove('on');if(!$('#modal').hidden&&!$('#modal').dataset.done){}};
$('#cartBtn').onclick=openCart;$('#ov').onclick=()=>{closeAll();closeModal()};
$('#drawer').addEventListener('click',e=>{const t=e.target.closest('button,a');if(!t)return;
 if(t.dataset.q)setQty(t.dataset.id,+t.dataset.q);else if(t.dataset.rm){cart=cart.filter(i=>i.id!=t.dataset.rm);save();renderCart()}
 else if(t.dataset.act=='close')closeAll();else if(t.dataset.act=='checkout')openCheckout()});
document.addEventListener('keydown',e=>{if(e.key=='Escape'){closeAll();closeModal()}});
/* ---------- checkout ---------- */
function closeModal(){$('#modal').hidden=true;$('#modal').innerHTML='';if($('#drawer').classList.contains('open')==false)$('#ov').classList.remove('on')}
function openCheckout(){if(!cart.length)return toast('Your cart is empty');$('#drawer').classList.remove('open');$('#ov').classList.add('on');const m=$('#modal');m.hidden=false;
 m.innerHTML=`<div class="mb"><button class="x" data-m="close" aria-label="Close">✕</button><h3>Checkout</h3><div class="co"><form id="cf" novalidate><label>Full Name<input name="name" required></label><label>Phone / WhatsApp<input name="phone" placeholder="+971 5X XXX XXXX" required></label><label>Emirate<select name="city"><option>Dubai</option><option>Abu Dhabi</option><option>Sharjah</option><option>Ajman</option><option>Al Ain</option><option>Ras Al Khaimah</option><option>Fujairah</option><option>Umm Al Quwain</option></select></label><label>Full Address<textarea name="addr" rows="2" required></textarea></label><label>Notes (optional)<input name="note"></label><div class="pay2"><b>Payment:</b> ◉ Cash on Delivery</div><p class="err" id="err"></p><button class="blk" type="submit">PLACE ORDER · ${fmt(total())}</button></form>
 <div class="os"><h4>Order Summary</h4>${cart.map(i=>`<div><span>${i.qty} × ${esc(CAT[i.id].name)}</span><b>${fmt(i.qty*CAT[i.id].price)}</b></div>`).join('')}<div class="tl"><span>Total</span><b>${fmt(total())}</b></div></div></div></div>`;
 $('#cf').onsubmit=e=>{e.preventDefault();const f=Object.fromEntries(new FormData(e.target));
  if(!f.name.trim()||!/^[+\d][\d\s-]{7,}$/.test(f.phone.trim())||!f.addr.trim()){$('#err').textContent='Please enter your name, a valid phone number and your address.';return}
  const no='CW'+Date.now().toString().slice(-6),lines=cart.map(i=>`• ${i.qty} x ${CAT[i.id].name} – ${fmt(i.qty*CAT[i.id].price)}`).join('\n');
  const msg=`New Order ${no}\n${lines}\nTotal: ${fmt(total())}\n\nName: ${f.name}\nPhone: ${f.phone}\nCity: ${f.city}\nAddress: ${f.addr}${f.note?'\nNote: '+f.note:''}\nPayment: Cash on Delivery`;
  m.innerHTML=`<div class="mb ok"><div class="tick">✓</div><h3>Thank you, ${esc(f.name.split(' ')[0])}!</h3><p>Your order <b>${no}</b> has been placed.<br>Total: <b>${fmt(total())}</b> · Cash on Delivery</p><a class="wa" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent(msg)}">CONFIRM ON WHATSAPP 📱</a><button class="ghost" data-m="close">Close</button></div>`;
  cart=[];save();renderCart()}}
$('#modal').addEventListener('click',e=>{if(e.target.dataset.m=='close'||e.target===$('#modal'))closeModal()});
/* ---------- product page + routing ---------- */
function showProduct(id){const p=CAT[id],rel=raw[p.k].map((_,i)=>CAT[p.k+i]).filter(x=>x.id!=id).slice(0,4);
 $('#home').hidden=true;const el=$('#product');el.hidden=false;
 el.innerHTML=`<div class="pp"><nav class="bc"><a href="#">Home</a> / <a href="#${p.k=='n'?'necklace':p.k=='r'?'rings':'bracelet'}">${CATN[p.k]}</a> / <span>${esc(p.name)}</span></nav>
 <div class="pg"><div class="zoom" id="zoom"><img src="${img(p.id)}" alt="${esc(p.name)}">${p.old?'<span class="sale">-8%</span>':''}</div>
 <div class="pi"><small class="cn">${CATN[p.k].toUpperCase()} · CATWALK HUB</small><h1>${esc(p.name)}</h1><div class="rt big">★★★★★ <em>(24 reviews)</em></div>
 <div class="price">${fmt(p.price)} ${p.old?'<s>'+fmt(p.old)+'</s>':''}</div><p class="ds">${DESC[p.k]}</p>
 <ul class="ft"><li>✔ Waterproof &amp; tarnish-free</li><li>✔ Hypoallergenic stainless steel</li><li>✔ 18K gold PVD plating</li><li>✔ Cash on Delivery available</li></ul>
 <div class="buy2"><div class="qty"><button id="qm">−</button><input id="qv" value="1" readonly><button id="qp">+</button></div><button class="blk" id="atc">ADD TO CART</button></div>
 <button class="gold" id="bn">BUY NOW</button>
 <a class="wa2" target="_blank" rel="noopener" href="https://wa.me/${WA}?text=${encodeURIComponent('Hi, I want to order: '+p.name+' ('+fmt(p.price)+')')}">ORDER ON WHATSAPP 📱</a>
 <details open><summary>Description</summary><p>${DESC[p.k]} Care tip: wipe with a soft cloth and store in the pouch provided.</p></details>
 <details><summary>Shipping &amp; Delivery</summary><p>Delivery across the UAE in 2–4 working days. Cash on Delivery available.</p></details>
 <details><summary>Return &amp; Exchange</summary><p>Easy return or exchange within 7 days if the item is unused and in original packaging.</p></details></div></div>
 <h5 class="rh">YOU MAY ALSO LIKE</h5><div class="row">${rel.map(r=>`<a class="p" href="#/product/${r.id}"><div class="im"><img src="${img(r.id)}" alt=""></div><b>${esc(r.name)}</b><span class="rt">★★★★★</span><span class="pr">${fmt(r.price)}</span></a>`).join('')}</div></div>`;
 const q=()=>$('#qv'),z=$('#zoom'),zi=z.querySelector('img');
 $('#qm').onclick=()=>q().value=Math.max(1,+q().value-1);$('#qp').onclick=()=>q().value=Math.min(10,+q().value+1);
 $('#atc').onclick=()=>{addToCart(id,+q().value);toast('Added to cart ✓');openCart()};
 $('#bn').onclick=()=>{addToCart(id,+q().value);openCheckout()};
 z.onmousemove=e=>{const r=z.getBoundingClientRect();zi.style.transformOrigin=((e.clientX-r.left)/r.width*100)+'% '+((e.clientY-r.top)/r.height*100)+'%';zi.style.transform='scale(1.6)'};
 z.onmouseleave=()=>zi.style.transform='';
 document.title=p.name+' – Catwalk Hub';window.scrollTo({top:0,behavior:'instant'})}
function route(){const h=location.hash,m=h.match(/^#\/product\/(\w+)$/);closeAll();
 if(m&&CAT[m[1]])return showProduct(m[1]);
 $('#home').hidden=false;$('#product').hidden=true;document.title='Catwalk Hub – Where Grace Meets the Golden Hour';
 let t=null;try{t=h.length>1&&h[1]!='/'?document.querySelector(h):null}catch(e){}
 t?t.scrollIntoView():window.scrollTo({top:0,behavior:'instant'})}
window.addEventListener('hashchange',route);renderCart();route();
