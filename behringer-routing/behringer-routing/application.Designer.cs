namespace behringer_routing
{
    partial class application
    {
        /// <summary>
        /// Required designer variable.
        /// </summary>
        private System.ComponentModel.IContainer components = null;

        /// <summary>
        /// Clean up any resources being used.
        /// </summary>
        /// <param name="disposing">true if managed resources should be disposed; otherwise, false.</param>
        protected override void Dispose(bool disposing)
        {
            if (disposing && (components != null))
            {
                components.Dispose();
            }
            base.Dispose(disposing);
        }

        #region Windows Form Designer generated code

        /// <summary>
        /// Required method for Designer support - do not modify
        /// the contents of this method with the code editor.
        /// </summary>
        private void InitializeComponent()
        {
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle1 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle2 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle3 = new System.Windows.Forms.DataGridViewCellStyle();
            System.Windows.Forms.DataGridViewCellStyle dataGridViewCellStyle4 = new System.Windows.Forms.DataGridViewCellStyle();
            this.tabControl1 = new System.Windows.Forms.TabControl();
            this.tabDevices = new System.Windows.Forms.TabPage();
            this.groupBoxChannels = new System.Windows.Forms.GroupBox();
            this.dataGridViewChannels = new System.Windows.Forms.DataGridView();
            this.groupBoxSettings = new System.Windows.Forms.GroupBox();
            this.buttonAdd = new System.Windows.Forms.Button();
            this.buttonRemove = new System.Windows.Forms.Button();
            this.tbxName = new System.Windows.Forms.TextBox();
            this.buttonSaveSettings = new System.Windows.Forms.Button();
            this.comboBoxOutput = new System.Windows.Forms.ComboBox();
            this.buttonDown = new System.Windows.Forms.Button();
            this.comboBoxAES50 = new System.Windows.Forms.ComboBox();
            this.comboBoxDevice = new System.Windows.Forms.ComboBox();
            this.buttonUp = new System.Windows.Forms.Button();
            this.label4 = new System.Windows.Forms.Label();
            this.label5 = new System.Windows.Forms.Label();
            this.label2 = new System.Windows.Forms.Label();
            this.label1 = new System.Windows.Forms.Label();
            this.groupBoxDevice = new System.Windows.Forms.GroupBox();
            this.dataGridViewDevices = new System.Windows.Forms.DataGridView();
            this.tabPage2 = new System.Windows.Forms.TabPage();
            this.menuStrip1 = new System.Windows.Forms.MenuStrip();
            this.fileToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.saveToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.helpToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.infoToolStripMenuItem = new System.Windows.Forms.ToolStripMenuItem();
            this.tabControl1.SuspendLayout();
            this.tabDevices.SuspendLayout();
            this.groupBoxChannels.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewChannels)).BeginInit();
            this.groupBoxSettings.SuspendLayout();
            this.groupBoxDevice.SuspendLayout();
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewDevices)).BeginInit();
            this.menuStrip1.SuspendLayout();
            this.SuspendLayout();
            // 
            // tabControl1
            // 
            this.tabControl1.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.tabControl1.Controls.Add(this.tabDevices);
            this.tabControl1.Controls.Add(this.tabPage2);
            this.tabControl1.Location = new System.Drawing.Point(0, 27);
            this.tabControl1.Name = "tabControl1";
            this.tabControl1.SelectedIndex = 0;
            this.tabControl1.Size = new System.Drawing.Size(884, 434);
            this.tabControl1.TabIndex = 0;
            // 
            // tabDevices
            // 
            this.tabDevices.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.tabDevices.Controls.Add(this.groupBoxChannels);
            this.tabDevices.Controls.Add(this.groupBoxSettings);
            this.tabDevices.Controls.Add(this.groupBoxDevice);
            this.tabDevices.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.tabDevices.Location = new System.Drawing.Point(4, 22);
            this.tabDevices.Name = "tabDevices";
            this.tabDevices.Padding = new System.Windows.Forms.Padding(3, 3, 3, 3);
            this.tabDevices.Size = new System.Drawing.Size(876, 408);
            this.tabDevices.TabIndex = 0;
            this.tabDevices.Text = "Devices";
            // 
            // groupBoxChannels
            // 
            this.groupBoxChannels.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.groupBoxChannels.Controls.Add(this.dataGridViewChannels);
            this.groupBoxChannels.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBoxChannels.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.groupBoxChannels.Location = new System.Drawing.Point(5, 173);
            this.groupBoxChannels.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxChannels.Name = "groupBoxChannels";
            this.groupBoxChannels.Padding = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxChannels.Size = new System.Drawing.Size(620, 236);
            this.groupBoxChannels.TabIndex = 2;
            this.groupBoxChannels.TabStop = false;
            this.groupBoxChannels.Text = "Channels";
            // 
            // dataGridViewChannels
            // 
            this.dataGridViewChannels.AllowUserToAddRows = false;
            this.dataGridViewChannels.AllowUserToDeleteRows = false;
            this.dataGridViewChannels.AllowUserToResizeRows = false;
            this.dataGridViewChannels.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dataGridViewChannels.BackgroundColor = System.Drawing.SystemColors.ControlDarkDark;
            this.dataGridViewChannels.BorderStyle = System.Windows.Forms.BorderStyle.None;
            dataGridViewCellStyle1.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle1.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            dataGridViewCellStyle1.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle1.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            dataGridViewCellStyle1.SelectionBackColor = System.Drawing.Color.DarkBlue;
            dataGridViewCellStyle1.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle1.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dataGridViewChannels.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle1;
            this.dataGridViewChannels.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridViewCellStyle2.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle2.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            dataGridViewCellStyle2.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle2.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            dataGridViewCellStyle2.SelectionBackColor = System.Drawing.Color.MidnightBlue;
            dataGridViewCellStyle2.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle2.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dataGridViewChannels.DefaultCellStyle = dataGridViewCellStyle2;
            this.dataGridViewChannels.GridColor = System.Drawing.SystemColors.ControlLight;
            this.dataGridViewChannels.Location = new System.Drawing.Point(5, 17);
            this.dataGridViewChannels.MultiSelect = false;
            this.dataGridViewChannels.Name = "dataGridViewChannels";
            this.dataGridViewChannels.RowHeadersVisible = false;
            this.dataGridViewChannels.RowHeadersWidth = 72;
            this.dataGridViewChannels.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataGridViewChannels.Size = new System.Drawing.Size(610, 215);
            this.dataGridViewChannels.TabIndex = 0;
            this.dataGridViewChannels.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewDevices_CellClick);
            this.dataGridViewChannels.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewDevices_CellContentClick);
            this.dataGridViewChannels.CellEndEdit += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewDevices_CellEndEdit);
            // 
            // groupBoxSettings
            // 
            this.groupBoxSettings.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.groupBoxSettings.Controls.Add(this.buttonAdd);
            this.groupBoxSettings.Controls.Add(this.buttonRemove);
            this.groupBoxSettings.Controls.Add(this.tbxName);
            this.groupBoxSettings.Controls.Add(this.buttonSaveSettings);
            this.groupBoxSettings.Controls.Add(this.comboBoxOutput);
            this.groupBoxSettings.Controls.Add(this.buttonDown);
            this.groupBoxSettings.Controls.Add(this.comboBoxAES50);
            this.groupBoxSettings.Controls.Add(this.comboBoxDevice);
            this.groupBoxSettings.Controls.Add(this.buttonUp);
            this.groupBoxSettings.Controls.Add(this.label4);
            this.groupBoxSettings.Controls.Add(this.label5);
            this.groupBoxSettings.Controls.Add(this.label2);
            this.groupBoxSettings.Controls.Add(this.label1);
            this.groupBoxSettings.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBoxSettings.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.groupBoxSettings.Location = new System.Drawing.Point(629, 174);
            this.groupBoxSettings.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxSettings.Name = "groupBoxSettings";
            this.groupBoxSettings.Padding = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxSettings.Size = new System.Drawing.Size(246, 236);
            this.groupBoxSettings.TabIndex = 2;
            this.groupBoxSettings.TabStop = false;
            this.groupBoxSettings.Text = "Settings";
            // 
            // buttonAdd
            // 
            this.buttonAdd.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonAdd.ForeColor = System.Drawing.SystemColors.ControlText;
            this.buttonAdd.Location = new System.Drawing.Point(180, 139);
            this.buttonAdd.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonAdd.Name = "buttonAdd";
            this.buttonAdd.Size = new System.Drawing.Size(59, 20);
            this.buttonAdd.TabIndex = 1;
            this.buttonAdd.Text = "&Add";
            this.buttonAdd.UseVisualStyleBackColor = true;
            this.buttonAdd.Click += new System.EventHandler(this.buttonAdd_Click);
            // 
            // buttonRemove
            // 
            this.buttonRemove.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonRemove.ForeColor = System.Drawing.SystemColors.ControlText;
            this.buttonRemove.Location = new System.Drawing.Point(117, 139);
            this.buttonRemove.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonRemove.Name = "buttonRemove";
            this.buttonRemove.Size = new System.Drawing.Size(59, 20);
            this.buttonRemove.TabIndex = 1;
            this.buttonRemove.Text = "&Remove";
            this.buttonRemove.UseVisualStyleBackColor = true;
            this.buttonRemove.Click += new System.EventHandler(this.buttonRemove_Click);
            // 
            // tbxName
            // 
            this.tbxName.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.tbxName.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.tbxName.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.tbxName.Location = new System.Drawing.Point(57, 95);
            this.tbxName.Name = "tbxName";
            this.tbxName.Size = new System.Drawing.Size(184, 20);
            this.tbxName.TabIndex = 8;
            // 
            // buttonSaveSettings
            // 
            this.buttonSaveSettings.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonSaveSettings.ForeColor = System.Drawing.SystemColors.ControlText;
            this.buttonSaveSettings.Location = new System.Drawing.Point(180, 115);
            this.buttonSaveSettings.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonSaveSettings.Name = "buttonSaveSettings";
            this.buttonSaveSettings.Size = new System.Drawing.Size(59, 20);
            this.buttonSaveSettings.TabIndex = 1;
            this.buttonSaveSettings.Text = "&Save";
            this.buttonSaveSettings.UseVisualStyleBackColor = true;
            this.buttonSaveSettings.Click += new System.EventHandler(this.buttonSaveSettings_Click);
            // 
            // comboBoxOutput
            // 
            this.comboBoxOutput.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.comboBoxOutput.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.comboBoxOutput.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.comboBoxOutput.FormattingEnabled = true;
            this.comboBoxOutput.Location = new System.Drawing.Point(57, 72);
            this.comboBoxOutput.Name = "comboBoxOutput";
            this.comboBoxOutput.Size = new System.Drawing.Size(184, 22);
            this.comboBoxOutput.Sorted = true;
            this.comboBoxOutput.TabIndex = 2;
            // 
            // buttonDown
            // 
            this.buttonDown.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonDown.Enabled = false;
            this.buttonDown.ForeColor = System.Drawing.SystemColors.ControlText;
            this.buttonDown.Location = new System.Drawing.Point(5, 139);
            this.buttonDown.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonDown.Name = "buttonDown";
            this.buttonDown.Size = new System.Drawing.Size(20, 20);
            this.buttonDown.TabIndex = 1;
            this.buttonDown.Text = "↓";
            this.buttonDown.UseVisualStyleBackColor = true;
            this.buttonDown.Click += new System.EventHandler(this.buttonDown_Click);
            // 
            // comboBoxAES50
            // 
            this.comboBoxAES50.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.comboBoxAES50.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.comboBoxAES50.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.comboBoxAES50.FormattingEnabled = true;
            this.comboBoxAES50.Location = new System.Drawing.Point(57, 49);
            this.comboBoxAES50.Name = "comboBoxAES50";
            this.comboBoxAES50.Size = new System.Drawing.Size(184, 22);
            this.comboBoxAES50.Sorted = true;
            this.comboBoxAES50.TabIndex = 2;
            // 
            // comboBoxDevice
            // 
            this.comboBoxDevice.Anchor = ((System.Windows.Forms.AnchorStyles)(((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.comboBoxDevice.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.comboBoxDevice.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.comboBoxDevice.FormattingEnabled = true;
            this.comboBoxDevice.Location = new System.Drawing.Point(57, 27);
            this.comboBoxDevice.Name = "comboBoxDevice";
            this.comboBoxDevice.Size = new System.Drawing.Size(184, 22);
            this.comboBoxDevice.Sorted = true;
            this.comboBoxDevice.TabIndex = 2;
            // 
            // buttonUp
            // 
            this.buttonUp.Anchor = ((System.Windows.Forms.AnchorStyles)((System.Windows.Forms.AnchorStyles.Bottom | System.Windows.Forms.AnchorStyles.Right)));
            this.buttonUp.Enabled = false;
            this.buttonUp.ForeColor = System.Drawing.SystemColors.ControlText;
            this.buttonUp.Location = new System.Drawing.Point(29, 139);
            this.buttonUp.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.buttonUp.Name = "buttonUp";
            this.buttonUp.Size = new System.Drawing.Size(20, 20);
            this.buttonUp.TabIndex = 1;
            this.buttonUp.Text = "↑";
            this.buttonUp.UseVisualStyleBackColor = true;
            this.buttonUp.Click += new System.EventHandler(this.buttonUp_Click);
            // 
            // label4
            // 
            this.label4.AutoSize = true;
            this.label4.Location = new System.Drawing.Point(3, 98);
            this.label4.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label4.Name = "label4";
            this.label4.Size = new System.Drawing.Size(34, 14);
            this.label4.TabIndex = 0;
            this.label4.Text = "Name";
            // 
            // label5
            // 
            this.label5.AutoSize = true;
            this.label5.Location = new System.Drawing.Point(3, 75);
            this.label5.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label5.Name = "label5";
            this.label5.Size = new System.Drawing.Size(39, 14);
            this.label5.TabIndex = 0;
            this.label5.Text = "Output";
            // 
            // label2
            // 
            this.label2.AutoSize = true;
            this.label2.Location = new System.Drawing.Point(3, 53);
            this.label2.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label2.Name = "label2";
            this.label2.Size = new System.Drawing.Size(40, 14);
            this.label2.TabIndex = 0;
            this.label2.Text = "AES50";
            // 
            // label1
            // 
            this.label1.AutoSize = true;
            this.label1.Location = new System.Drawing.Point(3, 30);
            this.label1.Margin = new System.Windows.Forms.Padding(2, 0, 2, 0);
            this.label1.Name = "label1";
            this.label1.Size = new System.Drawing.Size(40, 14);
            this.label1.TabIndex = 0;
            this.label1.Text = "Device";
            // 
            // groupBoxDevice
            // 
            this.groupBoxDevice.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.groupBoxDevice.Controls.Add(this.dataGridViewDevices);
            this.groupBoxDevice.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            this.groupBoxDevice.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.groupBoxDevice.Location = new System.Drawing.Point(5, 5);
            this.groupBoxDevice.Margin = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxDevice.Name = "groupBoxDevice";
            this.groupBoxDevice.Padding = new System.Windows.Forms.Padding(2, 2, 2, 2);
            this.groupBoxDevice.Size = new System.Drawing.Size(870, 165);
            this.groupBoxDevice.TabIndex = 2;
            this.groupBoxDevice.TabStop = false;
            this.groupBoxDevice.Text = "Devices";
            // 
            // dataGridViewDevices
            // 
            this.dataGridViewDevices.AllowUserToAddRows = false;
            this.dataGridViewDevices.AllowUserToDeleteRows = false;
            this.dataGridViewDevices.AllowUserToResizeRows = false;
            this.dataGridViewDevices.Anchor = ((System.Windows.Forms.AnchorStyles)((((System.Windows.Forms.AnchorStyles.Top | System.Windows.Forms.AnchorStyles.Bottom) 
            | System.Windows.Forms.AnchorStyles.Left) 
            | System.Windows.Forms.AnchorStyles.Right)));
            this.dataGridViewDevices.BackgroundColor = System.Drawing.SystemColors.ControlDarkDark;
            this.dataGridViewDevices.BorderStyle = System.Windows.Forms.BorderStyle.None;
            dataGridViewCellStyle3.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle3.BackColor = System.Drawing.Color.FromArgb(((int)(((byte)(64)))), ((int)(((byte)(64)))), ((int)(((byte)(64)))));
            dataGridViewCellStyle3.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle3.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            dataGridViewCellStyle3.SelectionBackColor = System.Drawing.Color.DarkBlue;
            dataGridViewCellStyle3.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle3.WrapMode = System.Windows.Forms.DataGridViewTriState.True;
            this.dataGridViewDevices.ColumnHeadersDefaultCellStyle = dataGridViewCellStyle3;
            this.dataGridViewDevices.ColumnHeadersHeightSizeMode = System.Windows.Forms.DataGridViewColumnHeadersHeightSizeMode.AutoSize;
            dataGridViewCellStyle4.Alignment = System.Windows.Forms.DataGridViewContentAlignment.MiddleLeft;
            dataGridViewCellStyle4.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            dataGridViewCellStyle4.Font = new System.Drawing.Font("Arial", 8.142858F, System.Drawing.FontStyle.Regular, System.Drawing.GraphicsUnit.Point, ((byte)(0)));
            dataGridViewCellStyle4.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            dataGridViewCellStyle4.SelectionBackColor = System.Drawing.Color.MidnightBlue;
            dataGridViewCellStyle4.SelectionForeColor = System.Drawing.SystemColors.HighlightText;
            dataGridViewCellStyle4.WrapMode = System.Windows.Forms.DataGridViewTriState.False;
            this.dataGridViewDevices.DefaultCellStyle = dataGridViewCellStyle4;
            this.dataGridViewDevices.GridColor = System.Drawing.SystemColors.ControlLight;
            this.dataGridViewDevices.Location = new System.Drawing.Point(9, 17);
            this.dataGridViewDevices.Name = "dataGridViewDevices";
            this.dataGridViewDevices.RowHeadersVisible = false;
            this.dataGridViewDevices.RowHeadersWidth = 72;
            this.dataGridViewDevices.SelectionMode = System.Windows.Forms.DataGridViewSelectionMode.FullRowSelect;
            this.dataGridViewDevices.Size = new System.Drawing.Size(854, 144);
            this.dataGridViewDevices.TabIndex = 0;
            this.dataGridViewDevices.CellClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewDevices_CellClick);
            this.dataGridViewDevices.CellContentClick += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewDevices_CellContentClick);
            this.dataGridViewDevices.CellEndEdit += new System.Windows.Forms.DataGridViewCellEventHandler(this.dataGridViewDevices_CellEndEdit);
            // 
            // tabPage2
            // 
            this.tabPage2.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.tabPage2.Location = new System.Drawing.Point(4, 22);
            this.tabPage2.Name = "tabPage2";
            this.tabPage2.Padding = new System.Windows.Forms.Padding(3, 3, 3, 3);
            this.tabPage2.Size = new System.Drawing.Size(792, 397);
            this.tabPage2.TabIndex = 1;
            this.tabPage2.Text = "tabPage2";
            // 
            // menuStrip1
            // 
            this.menuStrip1.BackColor = System.Drawing.SystemColors.ControlDark;
            this.menuStrip1.ImageScalingSize = new System.Drawing.Size(28, 28);
            this.menuStrip1.Items.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.fileToolStripMenuItem,
            this.helpToolStripMenuItem});
            this.menuStrip1.Location = new System.Drawing.Point(0, 0);
            this.menuStrip1.Name = "menuStrip1";
            this.menuStrip1.Size = new System.Drawing.Size(884, 24);
            this.menuStrip1.TabIndex = 1;
            this.menuStrip1.Text = "menuStrip1";
            // 
            // fileToolStripMenuItem
            // 
            this.fileToolStripMenuItem.BackColor = System.Drawing.SystemColors.ButtonShadow;
            this.fileToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.saveToolStripMenuItem});
            this.fileToolStripMenuItem.Name = "fileToolStripMenuItem";
            this.fileToolStripMenuItem.Size = new System.Drawing.Size(37, 20);
            this.fileToolStripMenuItem.Text = "&File";
            // 
            // saveToolStripMenuItem
            // 
            this.saveToolStripMenuItem.Name = "saveToolStripMenuItem";
            this.saveToolStripMenuItem.Size = new System.Drawing.Size(98, 22);
            this.saveToolStripMenuItem.Text = "&Save";
            this.saveToolStripMenuItem.Click += new System.EventHandler(this.saveToolStripMenuItem_Click);
            // 
            // helpToolStripMenuItem
            // 
            this.helpToolStripMenuItem.DropDownItems.AddRange(new System.Windows.Forms.ToolStripItem[] {
            this.infoToolStripMenuItem});
            this.helpToolStripMenuItem.Name = "helpToolStripMenuItem";
            this.helpToolStripMenuItem.Size = new System.Drawing.Size(44, 20);
            this.helpToolStripMenuItem.Text = "&Help";
            // 
            // infoToolStripMenuItem
            // 
            this.infoToolStripMenuItem.Name = "infoToolStripMenuItem";
            this.infoToolStripMenuItem.Size = new System.Drawing.Size(107, 22);
            this.infoToolStripMenuItem.Text = "&About";
            // 
            // application
            // 
            this.AutoScaleDimensions = new System.Drawing.SizeF(6F, 13F);
            this.AutoScaleMode = System.Windows.Forms.AutoScaleMode.Font;
            this.BackColor = System.Drawing.SystemColors.ControlDarkDark;
            this.ClientSize = new System.Drawing.Size(884, 461);
            this.Controls.Add(this.tabControl1);
            this.Controls.Add(this.menuStrip1);
            this.ForeColor = System.Drawing.SystemColors.ControlLightLight;
            this.MainMenuStrip = this.menuStrip1;
            this.Name = "application";
            this.Text = "application";
            this.Load += new System.EventHandler(this.application_Load);
            this.Shown += new System.EventHandler(this.application_Shown);
            this.tabControl1.ResumeLayout(false);
            this.tabDevices.ResumeLayout(false);
            this.groupBoxChannels.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewChannels)).EndInit();
            this.groupBoxSettings.ResumeLayout(false);
            this.groupBoxSettings.PerformLayout();
            this.groupBoxDevice.ResumeLayout(false);
            ((System.ComponentModel.ISupportInitialize)(this.dataGridViewDevices)).EndInit();
            this.menuStrip1.ResumeLayout(false);
            this.menuStrip1.PerformLayout();
            this.ResumeLayout(false);
            this.PerformLayout();

        }

        #endregion

        private System.Windows.Forms.TabControl tabControl1;
        private System.Windows.Forms.TabPage tabDevices;
        private System.Windows.Forms.TabPage tabPage2;
        private System.Windows.Forms.MenuStrip menuStrip1;
        private System.Windows.Forms.ToolStripMenuItem fileToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem saveToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem helpToolStripMenuItem;
        private System.Windows.Forms.ToolStripMenuItem infoToolStripMenuItem;
        private System.Windows.Forms.DataGridView dataGridViewDevices;
        private System.Windows.Forms.Button buttonDown;
        private System.Windows.Forms.Button buttonUp;
        private System.Windows.Forms.Button buttonRemove;
        private System.Windows.Forms.Button buttonAdd;
        private System.Windows.Forms.GroupBox groupBoxDevice;
        private System.Windows.Forms.GroupBox groupBoxSettings;
        private System.Windows.Forms.GroupBox groupBoxChannels;
        private System.Windows.Forms.DataGridView dataGridViewChannels;
        private System.Windows.Forms.Label label4;
        private System.Windows.Forms.Label label5;
        private System.Windows.Forms.Label label2;
        private System.Windows.Forms.Label label1;
        private System.Windows.Forms.ComboBox comboBoxOutput;
        private System.Windows.Forms.ComboBox comboBoxAES50;
        private System.Windows.Forms.ComboBox comboBoxDevice;
        private System.Windows.Forms.TextBox tbxName;
        private System.Windows.Forms.Button buttonSaveSettings;
    }
}