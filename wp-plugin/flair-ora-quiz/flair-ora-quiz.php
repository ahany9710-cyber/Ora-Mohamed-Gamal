<?php
/**
 * Plugin Name: Flair Ora Quiz
 * Description: Game-style lead page for Ora projects (Solana, ZED, Silversands). Use the shortcode [flair_ora_quiz] on any page.
 * Version: 2.3.0
 * Author: Flair Agency
 * Text Domain: flair-ora-quiz
 */

if (!defined('ABSPATH')) {
    exit;
}

define('FOQ_VERSION', '2.3.0');
define('FOQ_URL', plugin_dir_url(__FILE__));

function foq_register_assets() {
    wp_register_style(
        'foq-fonts',
        'https://fonts.googleapis.com/css2?family=Alexandria:wght@300;400;500;600&display=swap',
        array(),
        null
    );
    wp_register_style('foq-style', FOQ_URL . 'assets/style.css', array('foq-fonts'), FOQ_VERSION);
    wp_register_script('foq-projects', FOQ_URL . 'assets/projects.js', array(), FOQ_VERSION, true);
    wp_register_script('foq-countries', FOQ_URL . 'assets/countries.js', array(), FOQ_VERSION, true);
    wp_register_script('foq-app', FOQ_URL . 'assets/app.js', array('foq-projects', 'foq-countries'), FOQ_VERSION, true);
}
add_action('wp_enqueue_scripts', 'foq_register_assets');

function foq_shortcode($atts) {
    $atts = shortcode_atts(
        array(
            'whatsapp'   => '201063330224',
            'phone'      => '+201063330224',
            'formspree'  => 'xzeddbwr',
            'fullwidth'  => '1',
        ),
        $atts,
        'flair_ora_quiz'
    );

    wp_enqueue_style('foq-style');
    wp_enqueue_script('foq-projects');
    wp_enqueue_script('foq-app');
    wp_localize_script('foq-app', 'FOQ_CONFIG', array(
        'assetsUrl'  => FOQ_URL . 'assets/',
        'whatsapp'   => preg_replace('/\D/', '', $atts['whatsapp']),
        'phone'      => $atts['phone'],
        'formspree'  => $atts['formspree'],
    ));

    $classes = 'foq-root' . ($atts['fullwidth'] === '1' ? ' foq-fullwidth' : '');

    add_action('wp_footer', 'foq_meta_pixel');

    return '<div id="foq-app" class="' . esc_attr($classes) . '" dir="rtl" lang="ar">'
        . '<noscript><p style="padding:24px;text-align:center">'
        . 'من فضلك فعّل JavaScript أو تواصل معنا على واتساب: '
        . '<a href="https://wa.me/' . esc_attr(preg_replace('/\D/', '', $atts['whatsapp'])) . '">WhatsApp</a>'
        . '</p></noscript></div>';
}
add_shortcode('flair_ora_quiz', 'foq_shortcode');

function foq_meta_pixel() {
    static $done = false;
    if ($done) {
        return;
    }
    $done = true;
    ?>
    <!-- Meta Pixel Code -->
    <script>
    !function(f,b,e,v,n,t,s)
    {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
    n.callMethod.apply(n,arguments):n.queue.push(arguments)};
    if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
    n.queue=[];t=b.createElement(e);t.async=!0;
    t.src=v;s=b.getElementsByTagName(e)[0];
    s.parentNode.insertBefore(t,s)}(window, document,'script',
    'https://connect.facebook.net/en_US/fbevents.js');
    fbq('init', '1422003716325287');
    fbq('track', 'PageView');
    </script>
    <noscript><img height="1" width="1" style="display:none" src="https://www.facebook.com/tr?id=1422003716325287&amp;ev=PageView&amp;noscript=1" alt="" /></noscript>
    <!-- End Meta Pixel Code -->
    <?php
}
