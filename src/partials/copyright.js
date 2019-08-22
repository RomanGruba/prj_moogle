import '../scss/footer.scss';
import $ from 'jquery';

  $(".trigger_popup_fricc").click(function(){
     $('.hover_bkgr_fricc').show();
  });
  $('.hover_bkgr_fricc').click(function(){
      $('.hover_bkgr_fricc').hide();
  });
  $('.popupCloseButton').click(function(){
      $('.hover_bkgr_fricc').hide();
  });

  $(".trigger_popup_fricc1").click(function(){
    $('.hover_bkgr_fricc1').show();
 });
 $('.hover_bkgr_fricc1').click(function(){
     $('.hover_bkgr_fricc1').hide();
 });
 $('.popupCloseButton1').click(function(){
     $('.hover_bkgr_fricc1').hide();
 });
