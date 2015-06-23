<?php
/**
 * Page Transition Class
 *
 * @package   Page_Transition
 * @author    Numix Technologies <numixtech@gmail.com>
 * @author    Gaurav Padia <gauravpadia14u@gmail.com>
 * @author    Asalam Godhaviya <godhaviya.asalam@gmail.com>
 * @license   GPL-2.0+
 * @link      http://numixtech.com
 * @copyright 2014 Numix Techonologies
 */

/**
 * @package Page_Transition
 * @author  Numix Technologies <numixtech@gmail.com>
 * @author  Gaurav Padia <gauravpadia14u@gmail.com>
 * @author  Asalam Godhaviya <godhaviya.asalam@gmail.com>
 */
class Page_Transition {
	
	/**
	 * Plugin version, used for cache-busting of style and script file references.
	 * 
	 * @since 1.0
	 *
	 * @var string
	 */
	const VERSION = '1.3';

	/**
	 * Unique identifier for plugin.
	 *
	 * @since 1.0
	 * 
	 * @var string
	 */
	protected $plugin_slug = 'page-transition';

	/**
	 * Instance of this class.
	 *
	 * @since 1.0
	 * 
	 * @var object
	 */
	protected static $instance = null;

	/**
	 * Stores Page In Transition option
	 *
	 * @since 1.0
	 * 
	 * @var string
	 */
	protected $page_in_transition;

	/**
	 * Stores Page Out Transition option
	 *
	 * @since 1.0
	 * 
	 * @var string
	 */
	protected $page_out_transition;

	/**
	 * Stores Page In Animation Duration option
	 *
	 * @since 1.1
	 * 
	 * @var int
	 */
	protected $page_in_duration = 1500;

	/**
	 * Stores Page Out Animation Duration option
	 *
	 * @since 1.1
	 * 
	 * @var int
	 */
	protected $page_out_duration = 800;

	/**
	 * Stores whether to show loading or not
	 *
	 * @since 1.1
	 * 
	 * @var string
	 */
	protected $show_loading = 'true';

	/**
	 * Stores loading text color
	 *
	 * @since 1.2
	 * 
	 * @var string
	 */
	protected $loading_color;

	/**
	 * Initialize the plugin by loading public scripts and styels or admin page
	 *
	 * @since 1.0
	 */
	public function __construct() {

		$this->page_in_transition  = get_option( 'nt_page_in_transition' );
		$this->page_out_transition = get_option( 'nt_page_out_transition' );
		$page_in_duration  = get_option( 'nt_page_in_duration' );
		$page_out_duration = get_option( 'nt_page_out_duration' );
		$show_loading      = get_option( 'nt_show_loading' );

		if ( ! empty( $page_in_duration ) ) $this->page_in_duration   = $page_in_duration;
		if ( ! empty( $page_out_duration ) ) $this->page_out_duration = $page_out_duration;
		if ( ! empty( $show_loading ) ) $this->show_loading = $show_loading;

		$this->loading_color = get_option( 'nt_loading_color' );

		if ( is_admin() ) {
			// Add the settings page and menu item.
			add_action( 'admin_menu', array( $this, 'plugin_admin_menu' ) );
			// Add an action link pointing to the settings page.
			$plugin_basename = plugin_basename( plugin_dir_path( __FILE__ ) . $this->plugin_slug . '.php' );
			add_filter( 'plugin_action_links_' . $plugin_basename, array( $this, 'add_action_links' ) );
			add_action( 'admin_enqueue_scripts', array( $this, 'admin_scripts' ) );
		} elseif ( ! empty( $this->page_in_transition ) || ! empty( $this->page_out_transition ) ) {
			//Add an X-UA-Compatible header
			add_filter( 'wp_headers', array( $this, 'add_ie_compatible_header' ) );
			// Load public-facing style sheet and JavaScript.
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_styles' ), 1000 );
			add_action( 'wp_enqueue_scripts', array( $this, 'enqueue_scripts' ) );
			add_action( 'wp_head', array( $this, 'head_scripts' ) );
			add_action( 'wp_footer', array( $this, 'footer_scripts' ) );
			add_filter( 'body_class', array( $this, 'body_class_names' ), 100 );
			if ( empty( $this->page_in_transition ) || ( $this->show_loading == 'true' && ! empty( $this->loading_color ) ) ) {
				add_action( 'wp_head', array( $this, 'head_styles' ) );
			}
		}
	}

	/**
	 * Return an instance of this class.
	 *
	 * @since 1.0
	 * 
	 * @return object A single instance of this class.
	 */
	public static function get_instance() {

		// If the single instance hasn't been set, set it now.
		if ( null == self::$instance ) {
			self::$instance = new self;
		}

		return self::$instance;
	}

	/**
	 * Register the settings menu for this plugin into the WordPress Settings menu.
	 * 
	 * @since 1.0
	 */
	public function plugin_admin_menu() {
		add_options_page( __( 'Page Transition Settings', 'page-transition' ), __( 'Page Transition', 'page-transition' ), 'manage_options', $this->plugin_slug, array( $this, 'page_transition_options' ) );
	}

	/**
	 * Add settings action link to the plugins page.
	 * 
	 * @param array $links
	 *
	 * @since 1.0
	 *
	 * @return array Plugin settings links
	 */
	public function add_action_links( $links ) {
		return array_merge(
			array(
				'settings' => '<a href="' . admin_url( 'options-general.php?page=' . $this->plugin_slug ) . '">' . __( 'Settings', $this->plugin_slug ) . '</a>'
			),
			$links
		);	
	}

	/**
	 * Render the settings page for this plugin.
	 * 
	 * @since 1.0
	 */
	public function page_transition_options() {
		if ( ! current_user_can( 'manage_options' ) )  {
			wp_die( __( 'You do not have sufficient permissions to access this page.' ) );
		}
		
		if ( ! empty( $_POST ) && check_admin_referer( 'page_transition', 'save_page_transition' ) ) {
			//add or update page transition options
			update_option( 'nt_page_in_transition', $_POST['page_in_transition'] );
			update_option( 'nt_page_out_transition', $_POST['page_out_transition'] );
			update_option( 'nt_page_in_duration', $_POST['page_in_duration'] );
			update_option( 'nt_page_out_duration', $_POST['page_out_duration'] );
			if ( isset( $_POST['show_loading'] ) && $_POST['show_loading'] == 'true' )
				update_option( 'nt_show_loading', $_POST['show_loading'] );
			else
				update_option( 'nt_show_loading', 'false' );

			update_option( 'nt_loading_color', $_POST['loading_color'] );
			
			wp_redirect( admin_url( 'options-general.php?page='.$_GET['page'].'&updated=1' ) );
		}

		$plugin_basename = plugin_basename( plugin_dir_path( __FILE__ ) );
		?>
		<div class="wrap">
			<h2><?php _e( 'Page Transition Settings', 'page-transition' );?></h2>
			<form method="post" action="<?php echo esc_url( admin_url( 'options-general.php?page='.$_GET['page'].'&noheader=true' ) ); ?>">
				<?php wp_nonce_field( 'page_transition', 'save_page_transition' ); ?>
				<table class="form-table">
					<tr>
						<th scope="row"><label for="page_in_transition"><?php _e( 'Page In Animation', 'page-transition' );?></label></th>
						<td><select name="page_in_transition" id="page_in_transition">
							<option value=""><?php _e( 'None', 'page-transition' );?></option>
							<?php foreach ( $this->get_page_in_transitions() as $key => $value ): ?>
							<option value="<?php esc_attr_e( $key ); ?>"<?php esc_attr_e( $key == $this->page_in_transition ? ' selected="selected"' : '' ); ?>><?php esc_attr_e( $value ); ?></option>
							<?php endforeach;?>
						</select></td>
						<td>
							<a href="http://wordpress.org/plugins/page-transition/" class="add-new-h2" target="_blank"><img src="<?php echo plugins_url( $plugin_basename ); ?>/images/star_on.gif" valign="top"> Rate Us On Wordpress</a>
						</td>
					</tr>
					<tr>
						<th scope="row"><label for="page_out_transition"><?php _e( 'Page Out Animation', 'page-transition' );?></th>
						<td><select name="page_out_transition" id="page_out_transition">
							<option value=""><?php _e( 'None', 'page-transition' );?></option>
							<?php foreach ( $this->get_page_out_transitions() as $key => $value ): ?>
							<option value="<?php esc_attr_e( $key ); ?>"<?php esc_attr_e( $key == $this->page_out_transition ? ' selected="selected"' : '' ); ?>><?php esc_attr_e( $value ); ?></option>
							<?php endforeach;?>
						</select></td>
					</tr>
					<tr>
						<th scope="row"><label for="page_in_duration"><?php _e( 'Page In Animation Duration', 'page-transition' );?></label></th>
						<td><input type="number" id="page_in_duration" name="page_in_duration" style="width:70px;" min="400" max="10000" value="<?php echo $this->page_in_duration; ?>"  /></td>
					</tr>
					<tr>
						<th scope="row"><label for="page_out_duration"><?php _e( 'Page Out Animation Duration', 'page-transition' );?></label></th>
						<td><input type="number" id="page_out_duration" name="page_out_duration" style="width:70px;" min="400" max="10000" value="<?php echo $this->page_out_duration; ?>"  /></td>
					</tr>
					<tr>
						<th scope="row"><label><?php _e( 'Show Loading', 'page-transition' );?></label></th>
						<td><input type="checkbox" id="show_loading" name="show_loading" <?php if ( $this->show_loading == 'true' ) echo 'checked="checked"' ?> value="true" /><label for="show_loading">Yes</label></td>
					</tr>
					<tr id="loading_color_field"<?php if( $this->show_loading != 'true' ) echo ' style="display:none;"'; ?>>
						<th scope="row"><label for="loading_color"><?php _e( 'Loading Text Color', 'page-transition' );?></label></th>
						<td><input type="text" id="loading_color" name="loading_color" style="width:70px;" value="<?php if( ! empty( $this->loading_color ) ) echo $this->loading_color; ?>"  /></td>
					</tr>
				</table>
				<p>
					<?php _e( '<strong>Tip:</strong> If you want to exclude page out animation on any particular link on a page then add class "<strong>no-animation</strong>" to that link "a" tag.', 'page-transition' ); ?>
				</p>
				<p class="submit">
					<input type="submit" name="Submit" class="button-primary" value="<?php esc_attr_e( 'Save Changes' ) ?>" />
				</p>
			</form>
			<p>
				<a href="http://wordpress.org/plugins/numix-post-slider/" target="_blank"><img src="<?php echo plugins_url( $plugin_basename ); ?>/images/numix_post_slider.png" /></a>
			</p>
		</div>
		<?php
	}

	/**
	 * Returns list of Page In Transitions
	 * 
	 * @since 1.0
	 *
	 * @return array Page in transitions
	 */
	public function get_page_in_transitions() {
		return array(
				'fade-in' => 'Fade In',
				'fade-in-up' => 'Fade In Up',
				'fade-in-down' => 'Fade In Down',
				'fade-in-left' => 'Fade In Left',
				'fade-in-right' => 'Fade In Right',
				'rotate-in' => 'Rotate In',
				'flip-in-x' => 'Flip In X',
				'flip-in-y' => 'Flip In Y',
				'zoom-in' => 'Zoom In',
			);
	}

	/**
	 * Returns list of Page Out Transitions
	 *
	 * @since 1.0
	 *
	 * @return array Page Out transitions
	 */
	public function get_page_out_transitions() {
		return array(
				'fade-out' => 'Fade Out',
				'fade-out-up' => 'Fade Out Up',
				'fade-out-down' => 'Fade Out Down',
				'fade-out-left' => 'Fade Out Left',
				'fade-out-right' => 'Fade Out Right',
				'rotate-out' => 'Rotate Out',
				'flip-out-x' => 'Flip Out X',
				'flip-out-y' => 'Flip Out Y',
				'zoom-out' => 'Zoom Out',
			);
	}

	/**
	 * Add headers for IE to override IE's Compatibility View Settings
	 * 
	 * @param array $headers WP current headers
	 *
	 * @since 1.0
	 *
	 * @return array Updated headers if msie user agent
	 */
	public function add_ie_compatible_header( $headers ) {
		if ( isset( $_SERVER['HTTP_USER_AGENT'] ) && ( strpos( $_SERVER['HTTP_USER_AGENT'], 'MSIE' ) !== false ) ) {
			$headers['X-UA-Compatible'] = 'IE=edge,chrome=1';
		}
		return $headers;
	}

	/**
	 * Register and enqueue public-facing style sheet.
	 *
	 * @since 1.0
	 */
	public function enqueue_styles() {
		wp_enqueue_style( $this->plugin_slug . '-animsition', plugins_url( 'css/animsition.min.css', __FILE__ ), array(), self::VERSION );
	}

	/**
	 * Register and enqueues public-facing JavaScript files.
	 *
	 * @since 1.0
	 */
	public function enqueue_scripts() {
		wp_enqueue_script( $this->plugin_slug . '-animsition-script', plugins_url( 'js/jquery.animsition.min.js', __FILE__ ), array( 'jquery' ), self::VERSION );
	}

	/**
	 * Register required body classes to be used in javascript
	 *
	 * @param array $classes Body classes
	 * 
	 * @since 1.0
	 *
	 * @return array Wordpress body classes
	 */
	public function body_class_names( $classes ) {
		$classes[] = 'animsition';
		return $classes;
	}

	/**
	 * Add styles and set animisition opacity to 1 when page in transition is not set
	 * 
	 * @since 1.0
	 */
	public function head_styles() {
		?>
		<style type="text/css">
		<?php if ( empty( $this->page_in_transition ) ) { ?>
		.animsition{opacity: 1;}
		<?php } ?>
		<?php if ( $this->show_loading == 'true' && ! empty( $this->loading_color ) ) { ?>
		.animsition-loading:after {color: <?php echo $this->loading_color;?>}
		<?php } ?>
		</style>
		<?php
	}

	/**
	 * Prints and Calls javascript plugin functions in header with transistion setttings
	 * 
	 * @since 1.0
	 */
	public function head_scripts() {
		?>
		<script type="text/javascript">
		jQuery( document ).ready( function($) {
			$('.animsition').animsition({
				inClass : '<?php echo $this->page_in_transition; ?>',
				outClass : '<?php echo $this->page_out_transition; ?>',
				inDuration : <?php echo $this->page_in_duration; ?>,
				outDuration : <?php echo $this->page_out_duration; ?>,
				loading : <?php echo $this->show_loading; ?>,
				touchSupport: false,
				linkElement: '.animsition-link, a[href]:not([target="_blank"]):not([href^="<?php echo esc_html($this->get_current_url());?>#"]):not([href^="#"]):not([href*="javascript"]):not([href*=".jpg"]):not([href*=".jpeg"]):not([href*=".gif"]):not([href*=".png"]):not([href*=".mov"]):not([href*=".swf"]):not([href*=".mp4"]):not([href*=".flv"]):not([href*=".avi"]):not([href*=".mp3"]):not([href^="mailto:"]):not([class="no-animation"])'
			});
		});
		</script>
		<?php
	}

	/**
	 * Footer javascript to wrap body with animsition div and remove animsition class from body that we added earlier via body_class filter
	 *
	 * @since 1.0
	 */
	public function footer_scripts() {
		?>
		<script type="text/javascript">
		jQuery( 'body' ).wrapInner( '<div class="animsition"></div>' ).removeClass( 'animsition' );
		</script>
		<?php
	}

	/**
	 * Get the current URL of the page being viewed
	 *
	 * @since 1.0
	 * 
	 * @return string Current URL
	 */
	public function get_current_url() {
		global $wp;
		if ( empty( $_SERVER['QUERY_STRING'] ) )
			$current_url = trailingslashit( home_url( $wp->request ) );
		else
			$current_url = add_query_arg( $_SERVER['QUERY_STRING'], '', trailingslashit( home_url( $wp->request ) ) );
		return $current_url;
	}

	/**
	 * Enqueue admin scripts
	 *
	 * @since 1.2
	 */
	public function admin_scripts( $hook_suffix ) {
		if( 'settings_page_page-transition' != $hook_suffix )
			return;
		wp_enqueue_style( 'wp-color-picker' );
		wp_enqueue_script( 'admin-script', plugins_url( 'js/admin.js', __FILE__ ), array( 'wp-color-picker' ), self::VERSION, true );
	}
}
